import React, { useEffect, useState } from "react";
import { API_URL, ADMIN_KEY, money } from "../utils";

export default function AdminPage({ products, editingProduct, setEditingProduct, loadProducts }) {
  const blank = { title: "", type: "", fit: "", price: "", image: "" };
  const [form, setForm] = useState(blank);

  useEffect(() => {
    setForm(editingProduct || blank);
  }, [editingProduct]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function saveProduct(event) {
    event.preventDefault();
    const payload = { title: form.title.trim(), type: form.type.trim(), fit: form.fit.trim(), price: Number(form.price), image: form.image.trim() };
    const url = editingProduct ? `${API_URL}/${editingProduct.id}` : API_URL;
    const headers = { "Content-Type": "application/json" };
    if (ADMIN_KEY) headers["x-admin-key"] = ADMIN_KEY;
    const response = await fetch(url, {
      method: editingProduct ? "PUT" : "POST",
      headers,
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      const errorText = await response.text();
      alert(`Product could not be saved. ${response.status} ${errorText || "Start the backend server first."}`);
      return;
    }
    setEditingProduct(null);
    setForm(blank);
    await loadProducts();
  }

  async function deleteProduct(id) {
    const headers = {};
    if (ADMIN_KEY) headers["x-admin-key"] = ADMIN_KEY;
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE", headers });
    if (!response.ok) {
      const errorText = await response.text();
      alert(`Product could not be deleted. ${response.status} ${errorText || "Start the backend server first."}`);
      return;
    }
    await loadProducts();
  }

  return (
    <section className="page admin-page active">
      <div className="admin-wrap">
        <div className="admin-title">
          <span>Backend Requirement</span>
          <h1>Product CRUD Dashboard</h1>
          <p>Add, view, edit and delete products stored through the Node.js backend in the database folder.</p>
        </div>
        <form className="crud-form" onSubmit={saveProduct}>
          <label>Product Name<input required value={form.title} onChange={(event) => updateField("title", event.target.value)} placeholder="Product title" /></label>
          <label>Category<input required value={form.type} onChange={(event) => updateField("type", event.target.value)} placeholder="T-Shirt, Polo, Trouser" /></label>
          <label>Fit<input value={form.fit} onChange={(event) => updateField("fit", event.target.value)} placeholder="Regular Fit" /></label>
          <label>Price PKR<input required type="number" min="1" value={form.price} onChange={(event) => updateField("price", event.target.value)} placeholder="1995" /></label>
          <label>Image URL<input required value={form.image} onChange={(event) => updateField("image", event.target.value)} placeholder="https://..." /></label>
          <div className="crud-actions">
            <button type="submit">{editingProduct ? "Update Product" : "Add Product"}</button>
            <button type="button" id="resetForm" onClick={() => { setEditingProduct(null); setForm(blank); }}>Clear</button>
          </div>
        </form>
        <div className="crud-table-wrap">
          <table className="crud-table">
            <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Actions</th></tr></thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td><div className="crud-product"><img src={product.image} alt={product.title} /><strong>{product.title}</strong></div></td>
                  <td>{product.type}</td>
                  <td>{money(product.price)}</td>
                  <td><div className="table-actions"><button type="button" onClick={() => setEditingProduct(product)}>Edit</button><button type="button" onClick={() => deleteProduct(product.id)}>Delete</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
