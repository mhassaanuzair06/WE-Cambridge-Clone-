const http = require("http");
const fs = require("fs/promises");
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
  const data = await fs.readFile(DB_FILE, "utf8");
  return JSON.parse(data);
}

async function writeProducts(products) {
  await fs.writeFile(DB_FILE, JSON.stringify(products, null, 2));
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
  return body ? JSON.parse(body) : {};
}

function validateProduct(input) {
  if (!input.title || !input.type || !input.price || !input.image) {
    return "title, type, price and image are required";
  }
  return null;
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
    return send(res, 201, product);
  }

  if (idMatch && req.method === "PUT") {
    const id = Number(idMatch[1]);
    const body = await getBody(req);
    const error = validateProduct(body);
    if (error) return send(res, 400, { error });
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
    return send(res, 200, products[index]);
  }

  if (idMatch && req.method === "DELETE") {
    const id = Number(idMatch[1]);
    const products = await readProducts();
    const filtered = products.filter((product) => product.id !== id);
    if (filtered.length === products.length) return send(res, 404, { error: "Product not found" });
    await writeProducts(filtered);
    return send(res, 200, { message: "Product deleted" });
  }

  return send(res, 404, { error: "API route not found" });
}

async function serveStatic(req, res, pathname) {
  const staticRoot = await fs.access(FRONTEND_DIST_DIR).then(() => FRONTEND_DIST_DIR).catch(() => FRONTEND_SOURCE_DIR);
  const safePath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.normalize(path.join(staticRoot, safePath));
  if (!filePath.startsWith(staticRoot)) return send(res, 403, "Forbidden", "text/plain; charset=utf-8");

  try {
    const content = await fs.readFile(filePath);
    send(res, 200, content, contentTypes[path.extname(filePath)] || "application/octet-stream");
  } catch {
    const fallback = await fs.readFile(path.join(staticRoot, "index.html"));
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
