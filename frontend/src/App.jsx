import React, { useEffect, useMemo, useState } from "react";
import Announcement from "./pages/HomePage"; // HomePage contains Announcement content previously
import Header from "./components/Header";
import { MenuDrawer, SearchDrawer, CartDrawer } from "./components/Drawers";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";
import ProductPage from "./pages/ProductPage";
import AdminPage from "./pages/AdminPage";
import ProductCard from "./components/ProductCard";
import { shopFile, API_URL, seedProducts } from "./utils";

function App() {
  const [route, setRoute] = useState(() => window.location.hash || "#home");
  const [products, setProducts] = useState(seedProducts);
  const [cart, setCart] = useState([]);
  const [drawer, setDrawer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuTab, setMenuTab] = useState("cambridge");
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [visibleCount, setVisibleCount] = useState(24);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(window.location.hash || "#home");
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
  }, [drawer]);

  async function loadProducts() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("API unavailable");
      setProducts(await response.json());
    } catch (error) {
      console.warn("Using local product seed because the backend API is unavailable.", error);
    }
  }

  function addToCart(productId) {
    const product = products.find((item) => item.id === Number(productId));
    if (!product) return;
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id);
      if (existing) return items.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...items, { ...product, qty: 1 }];
    });
    setDrawer("cart");
  }

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.qty * Number(item.price), 0);

  const filteredProducts = useMemo(() => {
    const list = products.filter((product) => category === "all" || product.type === category);
    if (sort === "priceLow") return [...list].sort((a, b) => Number(a.price) - Number(b.price));
    if (sort === "priceHigh") return [...list].sort((a, b) => Number(b.price) - Number(a.price));
    if (sort === "az") return [...list].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "new") return [...list].sort((a, b) => b.id - a.id);
    return list;
  }, [products, category, sort]);

  const selectedProductId = route.startsWith("#product-") ? Number(route.replace("#product-", "")) : null;
  const selectedProduct = products.find((product) => product.id === selectedProductId) || products[0];

  return (
    <>
      <div className="announce">Mashriq Eid-ul-Adha Collection is now live, shop now.</div>
      <Header cartCount={cartCount} cartTotal={cartTotal} openDrawer={setDrawer} />
      <MenuDrawer drawer={drawer} closeDrawer={() => setDrawer(null)} menuTab={menuTab} setMenuTab={setMenuTab} openSubmenu={openSubmenu} setOpenSubmenu={setOpenSubmenu} />
      <SearchDrawer drawer={drawer} closeDrawer={() => setDrawer(null)} products={products} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <CartDrawer drawer={drawer} closeDrawer={() => setDrawer(null)} cart={cart} />
      <button className={`scrim ${drawer ? "open" : ""}`} onClick={() => setDrawer(null)} aria-label="Close overlay" />

      <main>
        {(!route || route === "#home" || route === "#mashriq") && <HomePage />}
        {route === "#collection" && (
          <CollectionPage
            products={filteredProducts}
            category={category}
            setCategory={setCategory}
            sort={sort}
            setSort={setSort}
            visibleCount={visibleCount}
            setVisibleCount={setVisibleCount}
            addToCart={addToCart}
          />
        )}
        {route.startsWith("#product-") && <ProductPage product={selectedProduct} addToCart={addToCart} />}
        {route === "#admin" && (
          <AdminPage
            products={products}
            editingProduct={editingProduct}
            setEditingProduct={setEditingProduct}
            loadProducts={loadProducts}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
