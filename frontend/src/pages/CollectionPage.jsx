import React, { useState } from "react";
import ProductCard from "../components/ProductCard";

export default function CollectionPage({ products, category, setCategory, sort, setSort, visibleCount, setVisibleCount, addToCart }) {
  const [filterOpen, setFilterOpen] = useState(false);
  return (
    <section className="page collection-page active">
      <picture className="collection-hero">
        <img src="https://thecambridgeshop.com/cdn/shop/collections/newarrival.webp?v=1770186311" alt="New arrivals" />
      </picture>
      <div className="breadcrumb"><a href="#home">Home</a><span>New Arrivals</span></div>
      <div className="collection-toolbar">
        <p>Products : <span>{category === "all" ? "260" : products.length}</span></p>
        <button className="filter-toggle" onClick={() => setFilterOpen(true)}>Filter</button>
        <label>Sort
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="priceLow">Price, low to high</option>
            <option value="priceHigh">Price, high to low</option>
            <option value="az">Alphabetically, A-Z</option>
            <option value="new">Date, new to old</option>
          </select>
        </label>
      </div>
      <div className="collection-layout">
        <aside className={`filters ${filterOpen ? "open" : ""}`}>
          <div className="filter-head">
            <strong>Filter</strong>
            <button className="icon-button" onClick={() => setFilterOpen(false)} aria-label="Close filters">X</button>
          </div>
          <fieldset>
            <legend>Availability</legend>
            <label><input type="checkbox" defaultChecked /> In stock</label>
            <label><input type="checkbox" /> Sale</label>
          </fieldset>
          <fieldset>
            <legend>Category</legend>
            {["all", "T-Shirt", "Polo", "Trouser"].map((item) => (
              <label key={item}><input type="radio" name="category" value={item} checked={category === item} onChange={() => setCategory(item)} /> {item === "all" ? "All" : item}</label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Size</legend>
            <div className="size-row"><button>S</button><button>M</button><button>L</button><button>XL</button></div>
          </fieldset>
        </aside>
        <div className="product-grid">
          {products.slice(0, visibleCount).map((product) => <ProductCard product={product} addToCart={addToCart} key={product.id} />)}
        </div>
      </div>
      <div className="load-more">
        <p>You've viewed <span>{Math.min(visibleCount, products.length)}</span> of 260 products</p>
        <button onClick={() => setVisibleCount((count) => count + 24)}>Load More</button>
      </div>
    </section>
  );
}
