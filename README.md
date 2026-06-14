# Cambridge Shop Website Replica

This project clones the UI and basic shopping behavior of `https://thecambridgeshop.com/`.

## Folder Structure

- `frontend/` contains HTML, CSS and JavaScript for the Cambridge-style storefront.
- `backend/` contains a Node.js CRUD API and static file server.
- `database/` contains the JSON database used by the app plus a MySQL-compatible schema.

## Working Features

- Home page with Cambridge-style announcement bar, sticky header, menu/sidebar and image sections.
- Product listing page with one working category set, filter, sort, search and cart drawer.
- Product detail page with gallery thumbnails, sizes, quantity controls and add to cart.
- CRUD dashboard at `#admin` for product Create, Read, Update and Delete operations.

## Run

```bash
cd backend
npm start
```

Open `http://localhost:3000`.

If port 3000 is already busy on your computer, run:

```bash
$env:PORT=3001
npm start
```

Then open `http://localhost:3001`.
