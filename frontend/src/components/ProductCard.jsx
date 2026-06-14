import React from "react";

export default function ProductCard({ product, addToCart }) {
  return (
    <article className="product-card">
      <a className="product-media" href={`#product-${product.id}`}>
        <img src={product.image} alt={product.title} loading="lazy" />
        <button className="quick-add" type="button" onClick={(event) => { event.preventDefault(); addToCart(product.id); }}>Quick Add</button>
      </a>
      <div className="product-info">
        <h3><a href={`#product-${product.id}`}>{product.title}</a></h3>
        <div className="meta">{product.colors || 1} Colors {product.fit ? <><span>|</span> {product.fit}</> : null}</div>
        <div className="price">Rs.{Number(product.price).toLocaleString("en-PK")} PKR</div>
      </div>
    </article>
  );
}
