const http = require("http");
const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ROOT = path.resolve(__dirname, "..");
const FRONTEND_SOURCE_DIR = path.join(ROOT, "frontend");
const FRONTEND_DIST_DIR = path.join(FRONTEND_SOURCE_DIR, "dist");
const DB_FILE = path.join(ROOT, "database", "products.json");

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp"
};

async function readProducts() {
  try {
    const data = await fsp.readFile(DB_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.warn("Could not read/parse products DB, returning empty list:", err.message);
    return [];
  }
}

async function writeProducts(products) {
  // use atomic write: write to temp file then rename
  const dir = path.dirname(DB_FILE);
  const backupsDir = path.join(dir, 'backups');
  try {
    await fsp.mkdir(backupsDir, { recursive: true });
    if (fs.existsSync(DB_FILE)) {
      const ts = new Date().toISOString().replace(/[:.]/g, '-')
      const backupFile = path.join(backupsDir, `products.${ts}.json`);
      await fsp.copyFile(DB_FILE, backupFile);
    }
  } catch (err) {
    console.error('Failed to create backup of products.json', err);
  }

  const tmp = DB_FILE + '.tmp';
  await fsp.writeFile(tmp, JSON.stringify(products, null, 2));
  await fsp.rename(tmp, DB_FILE);
}

// Simple sequential queue to avoid concurrent writes
let writeQueue = Promise.resolve();
function enqueueWrite(fn) {
  // ensure writes run sequentially
  writeQueue = writeQueue.then(() => fn()).catch((err) => {
    console.error("Error during queued write:", err && err.message ? err.message : err);
  });
  return writeQueue;
}

function send(res, status, body, type = "application/json; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": type,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  if (Buffer.isBuffer(body) || typeof body === "string") {
    res.end(body);
    return;
  }
  res.end(JSON.stringify(body));
}

async function getBody(req) {
  let body = "";
  for await (const chunk of req) body += chunk;
  if (!body) return {};
  try {
    return JSON.parse(body);
  } catch (err) {
    return {};
  }
}

function validateProduct(input) {
  if (!input || typeof input !== 'object') return 'invalid payload';
  if (!input.title || typeof input.title !== 'string') return 'title is required';
  if (!input.type || typeof input.type !== 'string') return 'type is required';
  if (input.price === undefined || input.price === null) return 'price is required';
  const price = Number(input.price);
  if (!Number.isFinite(price) || price <= 0) return 'price must be a positive number';
  if (!input.image || typeof input.image !== 'string' || !/^https?:\/\//i.test(input.image)) return 'image must be a valid URL';
  if (input.colors !== undefined) {
    const colors = Number(input.colors);
    if (!Number.isInteger(colors) || colors < 1) return 'colors must be an integer >= 1';
  }

  // sanitize and length limits
  input.title = String(input.title).trim().slice(0, 200);
  input.type = String(input.type).trim().slice(0, 100);
  input.image = String(input.image).trim().slice(0, 1000);
  input.price = Math.round(price * 100) / 100; // two decimals

  return null;
}

function isAdmin(req) {
  const required = process.env.ADMIN_KEY;
  if (!required) return true; // admin key not configured — allow for local/dev
  const provided = req.headers['x-admin-key'] || req.headers['x-admin-key'.toLowerCase()];
  return provided === required;
}

async function handleApi(req, res, pathname) {
  if (req.method === "OPTIONS") return send(res, 204, "");
  const idMatch = pathname.match(/^\/api\/products\/(\d+)$/);

  if (pathname === "/api/products" && req.method === "GET") {
    return send(res, 200, await readProducts());
  }

  if (pathname === "/api/products" && req.method === "POST") {
    const body = await getBody(req);
    const error = validateProduct(body);
    if (error) return send(res, 400, { error });
      if (!isAdmin(req)) return send(res, 403, { error: 'admin key required' });
    
    await enqueueWrite(async () => {
      const products = await readProducts();
      const nextId = products.reduce((max, product) => Math.max(max, product.id), 0) + 1;
      const product = {
        id: nextId,
        title: body.title,
        type: body.type,
        fit: body.fit || "",
        colors: Number(body.colors || 1),
        price: Number(body.price),
        image: body.image,
        gallery: body.gallery || []
      };
      products.push(product);
      await writeProducts(products);
      send(res, 201, product);
    });
    return;
  }

  if (idMatch && req.method === "PUT") {
    const id = Number(idMatch[1]);
    const body = await getBody(req);
    const error = validateProduct(body);
    if (error) return send(res, 400, { error });
    if (!isAdmin(req)) return send(res, 403, { error: 'admin key required' });
    // serialize update
    await enqueueWrite(async () => {
      const products = await readProducts();
      const index = products.findIndex((product) => product.id === id);
      if (index === -1) return send(res, 404, { error: "Product not found" });
      products[index] = {
        ...products[index],
        title: body.title,
        type: body.type,
        fit: body.fit || "",
        price: Number(body.price),
        image: body.image
      };
      await writeProducts(products);
      send(res, 200, products[index]);
    });
    return;
  }

  if (idMatch && req.method === "DELETE") {
    const id = Number(idMatch[1]);
    if (!isAdmin(req)) return send(res, 403, { error: 'admin key required' });

    await enqueueWrite(async () => {
      const products = await readProducts();
      const filtered = products.filter((product) => product.id !== id);
      if (filtered.length === products.length) return send(res, 404, { error: "Product not found" });
      await writeProducts(filtered);
      send(res, 200, { message: "Product deleted" });
    });
    return;
  }

  return send(res, 404, { error: "API route not found" });
}

async function serveStatic(req, res, pathname) {
  const staticRoot = await fsp.access(FRONTEND_DIST_DIR).then(() => FRONTEND_DIST_DIR).catch(() => FRONTEND_SOURCE_DIR);
  const safePath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.normalize(path.join(staticRoot, safePath));
  if (!filePath.startsWith(staticRoot)) return send(res, 403, "Forbidden", "text/plain; charset=utf-8");

  try {
    const content = await fsp.readFile(filePath);
    send(res, 200, content, contentTypes[path.extname(filePath)] || "application/octet-stream");
  } catch {
    const fallback = await fsp.readFile(path.join(staticRoot, "index.html"));
    send(res, 200, fallback, "text/html; charset=utf-8");
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    if (pathname.startsWith("/api/")) return await handleApi(req, res, pathname);
    return await serveStatic(req, res, pathname);
  } catch (error) {
    send(res, 500, { error: error.message });
  }
});

server.listen(PORT, () => {
  console.log(`Cambridge clone running at http://localhost:${PORT}`);
});
