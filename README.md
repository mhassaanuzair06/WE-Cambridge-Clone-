# Cambridge Shop Website Replica

This project clones the UI and basic shopping experience of `https://thecambridgeshop.com/` using a React/Vite frontend and a simple Node.js backend.

## Repository Structure

- `frontend/` - React + Vite storefront UI, product pages, cart and admin CRUD interface.
- `backend/` - Node.js API and static file server for product CRUD operations.
- `database/` - `products.json` holds product data and `schema.sql` provides a SQL-compatible schema example.

## Features

- Responsive home page with announcement bar, navigation, hero sections and product cards.
- Product listing with sort, category filter, search and cart drawer.
- Product detail page with image gallery, quantity controls and add-to-cart actions.
- Admin CRUD dashboard for adding, editing and deleting products via the backend API.

## Local Setup

### Backend

```bash
cd backend
npm install
npm start
```

Open the backend at `http://localhost:3000`.

If `3000` is occupied, start with another port:

```bash
$env:PORT=3001
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the frontend at `http://localhost:5173`.

The frontend uses `frontend/.env` to configure the API URL. If you need to run the backend on a different port, update `frontend/.env` accordingly.

## Environment Example

Copy this file and update if necessary:

```bash
cp frontend/.env.example frontend/.env
```

### Backend admin key

The backend supports an optional `ADMIN_KEY` environment variable. When set, `POST`, `PUT` and `DELETE` API operations require the `x-admin-key` HTTP header to match the secret.

Create a local copy for the backend and set a secure key:

```bash
cp backend/.env.example backend/.env
# edit backend/.env and set ADMIN_KEY to a strong value
```

Example `curl` to create a product when `ADMIN_KEY` is set:

```bash
curl -X POST http://localhost:3001/api/products \
	-H "Content-Type: application/json" \
	-H "x-admin-key: YOUR_ADMIN_KEY" \
	-d '{"title":"New item","type":"T-Shirt","price":1999,"image":"https://example.com/img.jpg"}'
```

## GitHub Actions CI

A GitHub Actions workflow is provided at `.github/workflows/nodejs.yml`.
It installs backend and frontend dependencies, then builds the frontend to verify the project compiles successfully.

## Notes

- The backend stores product data in `database/products.json` and does not use a database server.
- Do not commit sensitive values to `frontend/.env`.
- This repo is configured for development and learning, not production deployment.
