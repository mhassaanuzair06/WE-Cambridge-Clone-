import React from "react";

export default function HomePage() {
  return (
    <section className="home-page page active">
      <div className="home-section hero-slide" style={{ "--bg": "url('https://thecambridgeshop.com/cdn/shop/files/Main_f19db223-c1ed-4b62-a525-3edc0a5ba711.webp?v=1779086367')" }}>
        <a href="#collection" className="slide-link" aria-label="Shop summer collection"></a>
      </div>
      <div className="home-section split-banners">
        <a href="#collection" style={{ "--bg": "url('https://thecambridgeshop.com/cdn/shop/files/POLOS-2.webp?v=1779086368')" }}><span>POLOS</span></a>
        <a href="#collection" style={{ "--bg": "url('https://thecambridgeshop.com/cdn/shop/files/TShirts_528c9c8d-7b60-43ab-a04b-2926ab7f8b16.webp?v=1779086367')" }}><span>T-SHIRTS</span></a>
      </div>
      <div className="home-section hero-slide" style={{ "--bg": "url('https://thecambridgeshop.com/cdn/shop/files/formalshirts_f6147619-9bc3-4376-bf93-e03794e1c6b7.webp?v=1779086367')" }}></div>
      <div className="home-section hero-slide" id="mashriq" style={{ "--bg": "url('https://thecambridgeshop.com/cdn/shop/files/Main-D_79b023c9-79d6-40e2-9696-1d02da77ad69.webp?v=1778499821')" }}></div>
      <div className="home-section split-banners">
        <a href="#mashriq" style={{ "--bg": "url('https://thecambridgeshop.com/cdn/shop/files/Basic_Fancy-D_43c3fa91-6145-4649-ae9e-4ae3182b2345.webp?v=1778499821')" }}><span>BASIC FANCY</span></a>
        <a href="#mashriq" style={{ "--bg": "url('https://thecambridgeshop.com/cdn/shop/files/Shalwar_Kameez-D_ced45535-7972-4ddc-b33c-28d8a5fed83f.webp?v=1778499821')" }}><span>SHALWAR KAMEEZ</span></a>
      </div>
    </section>
  );
}
