import React from "react";

export const shopFile = (path) => `https://thecambridgeshop.com/cdn/shop/files/${path}`;
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:3000";
export const API_URL = import.meta.env.VITE_API_URL || `${backendUrl}/api/products`;
export const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY || "";

export const seedProducts = [
  {
    id: 1,
    title: "SINGLE JERSEY T-SHIRT - ASH GREY",
    type: "T-Shirt",
    fit: "Regular Fit",
    colors: 1,
    price: 1995,
    image: shopFile("DSC07019.jpg?v=1776498091&width=600"),
    gallery: [
      shopFile("DSC07019.jpg?v=1776498091&width=1090"),
      shopFile("DSC07024.jpg?v=1776498091&width=1090"),
      shopFile("DSC07025.jpg?v=1776498091&width=1090"),
      shopFile("DSC07023.jpg?v=1776498091&width=1090"),
      shopFile("DSC07016.jpg?v=1776498091&width=1090")
    ]
  },
  { id: 2, title: "SINGLE JERSEY T-SHIRT - NAVY BLUE", type: "T-Shirt", fit: "Regular Fit", colors: 1, price: 1995, image: shopFile("DSC06969.jpg?v=1773400333&width=600") },
  { id: 3, title: "SINGLE JERSEY T-SHIRT - MINT GREEN", type: "T-Shirt", fit: "Regular Fit", colors: 1, price: 1995, image: shopFile("DSC07152.jpg?v=1776498091&width=600") },
  { id: 4, title: "SINGLE JERSEY T-SHIRT - GREEN", type: "T-Shirt", fit: "Regular Fit", colors: 1, price: 1995, image: shopFile("DSC06942.jpg?v=1776498091&width=600") },
  { id: 5, title: "YARN DYED OFF-WHITE POLO", type: "Polo", fit: "Regular Fit", colors: 1, price: 4995, image: shopFile("DSC02098a.jpg?v=1779183568&width=600") },
  { id: 6, title: "DENIM JEANS - BLACK", type: "Trouser", fit: "Loose Fit", colors: 1, price: 5695, image: shopFile("DSC07491.jpg?v=1773396141&width=600") }
];

export const menuData = {
  cambridge: [
    ["NEW IN", ["Western New Arrivals", "Mashriq New Arrivals"]],
    ["Summer'26", ["Polos", "T-Shirts", "Formal Shirts", "Suiting"]],
    ["Shirts", ["Formal Shirts", "Casual Shirts", "Printed Shirts"]],
    ["Polos & Tees", ["Polos", "T-Shirts"]],
    ["Bottoms", ["Jeans", "Trousers", "Chinos"]],
    ["Blazers and Suits", ["Blazers", "Suits", "Waistcoats"]],
    ["Accessories", ["Fragrance", "Belts", "Wallets"]],
    ["Summer Sale", ["View All", "Shirts", "Polos", "Bottoms"]]
  ],
  mashriq: [
    ["New In", ["Ready to Wear", "Unstitched"]],
    ["Ready to Wear", ["Designer Suit", "Basic Fancy", "Shalwar Kameez", "Kurta", "Kurta Pajama", "Waistcoat", "Junior", "Bottoms", "Combo Suit"]],
    ["Ready to Stitch", ["Fabric"]],
    ["Sale", ["View All", "Shalwar Kameez", "Basic Fancy", "Designer Suit", "Kurta", "Waistcoat", "Unstitched"]]
  ]
};

export const money = (value) => `Rs.${Number(value).toLocaleString("en-PK")} PKR`;

export default {};
