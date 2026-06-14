import React from "react";
import Icon from "./Icon";

export default function Header({ cartCount, cartTotal, openDrawer }) {
  return (
    <header className="site-header">
      <div className="header-left">
        <button className="icon-button" onClick={() => openDrawer("menu")} aria-label="Open menu"><Icon name="menu" /></button>
        <button className="currency">PKR <span>v</span></button>
      </div>
      <a className="brand" href="#home" aria-label="Cambridge home">
        <img src="https://thecambridgeshop.com/cdn/shop/files/Logo_c40dc94f-768c-40f2-b717-346272fc9460.png?v=1662474101&width=216" alt="Cambridge" />
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        <a href="#collection">NEW IN <sup>New</sup></a>
        <a href="#home">Summer'26</a>
        <a href="#collection">Shirts</a>
        <a href="#collection">Polos & Tees</a>
        <a href="#collection">Bottoms</a>
        <a href="#collection">Blazers and Suits</a>
        <a href="#collection">Accessories</a>
        <a href="#admin">CRUD</a>
        <div className="nav-drop">
          <a href="#mashriq">Mashriq</a>
          <div className="mega">
            <div>
              <strong>Ready to Wear</strong>
              {["Designer Suit", "Basic Fancy", "Shalwar Kameez", "Kurta", "Kurta Pajama", "Waistcoat"].map((item) => <a href="#mashriq" key={item}>{item}</a>)}
            </div>
            <div>
              <strong>Ready to Stitch</strong>
              <a href="#mashriq">Fabric</a>
              <a href="#collection">Sale</a>
            </div>
          </div>
        </div>
      </nav>
      <div className="header-actions">
        <button className="icon-button" onClick={() => openDrawer("search")} aria-label="Search"><Icon name="search" /></button>
        <button className="icon-button" aria-label="Account"><Icon name="user" /></button>
        <button className="icon-button" aria-label="Wishlist"><Icon name="heart" /></button>
        <button className="cart-button" onClick={() => openDrawer("cart")} aria-label="Open cart">
          <Icon name="cart" />
          <span>{cartCount}</span>
          <em>/ Rs.<b>{cartTotal.toLocaleString("en-PK")}</b></em>
        </button>
      </div>
    </header>
  );
}
