import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="help-title">We're here to help</div>
      <div className="footer-grid">
        <div><h3>Company</h3><a href="#">About us</a><a href="#">Contact Us</a><a href="#">Privacy Policy</a><a href="#">Blogs</a></div>
        <div><h3>Order Information</h3><a href="#">Exchange & Returns</a><a href="#">Payment Guide</a><a href="#">Shipping Policy</a><a href="#">Claim Policy</a></div>
        <div><h3>Help</h3><a href="#">FAQs</a><a href="#">Customer Service</a><a href="#">Store Location</a></div>
        <form className="newsletter"><h3>Sign Up For Our Newsletter</h3><input type="email" placeholder="Your email address" /><button>Subscribe</button></form>
      </div>
      <div className="footer-bottom">
        <p>2026 Cambridge. All Rights Reserved.</p>
        <div className="payments"><img src="https://thecambridgeshop.com/cdn/shop/t/158/assets/master.svg?v=163550031558387206931771484740" alt="Mastercard" /><img src="https://thecambridgeshop.com/cdn/shop/t/158/assets/visa.svg?v=43396516388255831211771484740" alt="Visa" /></div>
      </div>
    </footer>
  );
}
