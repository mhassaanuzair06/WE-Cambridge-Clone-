import React from "react";
import Icon from "./Icon";
import { menuData } from "../utils";

export function MenuDrawer({ drawer, closeDrawer, menuTab, setMenuTab, openSubmenu, setOpenSubmenu }) {
  return (
    <aside className={`drawer menu-drawer ${drawer === "menu" ? "open" : ""}`} aria-hidden={drawer !== "menu"}>
      <div className="drawer-head">
        <img src="https://thecambridgeshop.com/cdn/shop/files/Logo_c40dc94f-768c-40f2-b717-346272fc9460.png?v=1662474101&width=180" alt="Cambridge" />
        <button className="icon-button" onClick={closeDrawer} aria-label="Close menu"><Icon name="close" /></button>
      </div>
      <div className="menu-tabs">
        {["cambridge", "mashriq"].map((tab) => (
          <button key={tab} className={menuTab === tab ? "active" : ""} onClick={() => setMenuTab(tab)}>{tab}</button>
        ))}
      </div>
      <nav className="side-menu">
        {menuData[menuTab].map(([title, children], index) => (
          <div key={title}>
            <button onClick={() => setOpenSubmenu(openSubmenu === index ? null : index)}>{title}<span>+</span></button>
            <div className={`side-sub ${openSubmenu === index ? "open" : ""}`}>
              {children.map((child) => <a href="#collection" onClick={closeDrawer} key={child}>{child}</a>)}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export function SearchDrawer({ drawer, closeDrawer, products, searchTerm, setSearchTerm }) {
  const results = products.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 6);
  return (
    <aside className={`drawer search-drawer ${drawer === "search" ? "open" : ""}`} aria-hidden={drawer !== "search"}>
      <div className="drawer-head">
        <h2>Search</h2>
        <button className="icon-button" onClick={closeDrawer} aria-label="Close search"><Icon name="close" /></button>
      </div>
      <label className="search-box">
        <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} type="search" placeholder="Search products" />
        <Icon name="search" />
      </label>
      <div className="search-results">
        {results.length ? results.map((product) => (
          <a className="mini-product" href={`#product-${product.id}`} onClick={closeDrawer} key={product.id}>
            <img src={product.image} alt={product.title} />
            <div><strong>{product.title}</strong><span>{product.price}</span></div>
          </a>
        )) : <p>No products found.</p>}
      </div>
    </aside>
  );
}

export function CartDrawer({ drawer, closeDrawer, cart }) {
  return (
    <aside className={`drawer cart-drawer ${drawer === "cart" ? "open" : ""}`} aria-hidden={drawer !== "cart"}>
      <div className="drawer-head">
        <h2>Shopping Cart</h2>
        <button className="icon-button" onClick={closeDrawer} aria-label="Close cart"><Icon name="close" /></button>
      </div>
      <div className={`cart-items ${cart.length ? "" : "empty"}`}>
        {cart.length ? cart.map((item) => (
          <div className="cart-line" key={item.id}>
            <img src={item.image} alt={item.title} />
            <div><strong>{item.title}</strong><span>{item.qty} x Rs.{item.price}</span></div>
          </div>
        )) : "Your cart is currently empty."}
      </div>
      <button className="checkout">Proceed to Checkout</button>
    </aside>
  );
}
