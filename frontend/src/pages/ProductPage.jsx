import React, { useEffect, useState } from "react";
import { money } from "../utils";

export default function ProductPage({ product, addToCart }) {
  const gallery = product?.gallery?.length ? product.gallery : [product.image, product.image, product.image];
  const [mainImage, setMainImage] = useState(gallery[0]);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setMainImage(gallery[0]);
    setQty(1);
  }, [product?.id]);

  if (!product) return null;

  return (
    <section className="page product-page active">
      <div className="breadcrumb"><a href="#home">Home</a><a href="#collection">New Arrivals</a><span>{product.title}</span></div>
      <div className="product-detail">
        <div className="gallery">
          <div className="thumbs">
            {gallery.map((image, index) => <button className={mainImage === image ? "active" : ""} onClick={() => setMainImage(image)} key={`${image}-${index}`}><img src={image} alt={`${product.title} view ${index + 1}`} /></button>)}
          </div>
          <div className="main-image"><img src={mainImage} alt={product.title} /></div>
        </div>
        <div className="product-summary">
          <h1>{product.title}</h1>
          <div className="price">{money(product.price)}</div>
          <div className="detail-line"></div>
          <div className="option-title"><span>Color: ASH GREY</span><span>{product.colors || 1} Colors</span></div>
          <div className="swatches"><span className="swatch" style={{ background: "#b8b8b6" }}></span><span className="swatch" style={{ background: "#1b273a" }}></span><span className="swatch" style={{ background: "#aac8b0" }}></span></div>
          <div className="detail-line"></div>
          <div className="option-title"><span>Size</span><a href="#admin">SIZECHART</a></div>
          <div className="sizes"><button>S</button><button className="active">M</button><button>L</button><button>XL</button></div>
          <div className="qty"><button onClick={() => setQty(Math.max(1, qty - 1))}>-</button><input value={qty} onChange={(event) => setQty(Math.max(1, Number(event.target.value || 1)))} inputMode="numeric" /><button onClick={() => setQty(qty + 1)}>+</button></div>
          <div className="product-actions">
            <button className="add-cart" onClick={() => addToCart(product.id)}>Add to Cart</button>
            <button className="buy-now" onClick={() => addToCart(product.id)}>Buy it now</button>
          </div>
          <div className="accordion">
            <details open><summary>Description</summary><p>Premium Cambridge menswear with a clean regular fit, soft feel, and everyday easy care finish. Product screen mirrors the live store flow with gallery, swatches, sizes, quantity, cart and size chart entry.</p></details>
            <details><summary>Shipping</summary><p>Nationwide delivery, exchange support and order status help through Cambridge customer service.</p></details>
            <details><summary>Returns & Exchange</summary><p>Items can be exchanged when unused, tagged and supported by the purchase receipt, following the Cambridge policy style.</p></details>
          </div>
        </div>
      </div>
    </section>
  );
}
