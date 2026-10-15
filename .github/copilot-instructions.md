# Morrow Skin Chile (Storefront e-commerce)

- Keep the app aligned with its skincare storefront purpose and responsive editorial direction.
- This project targets the **Chilean market**: prices are in CLP, shipping is by Chilean region, and payments use **Webpay (Transbank)** and **Mercado Pago**, both running in **sandbox** for testing.
- The catalog (`src/data/products.js`) is sample data. Payment must be connected to production credentials (Transbank Webpay / Mercado Pago) before accepting real orders.
- The frontend calls Netlify serverless functions via `/api/*` (redirected in `netlify.toml` to `/.netlify/functions/*`). Functions live in `netlify/functions/`.
- Run `npm run build` to verify the production frontend build, and confirm functions bundle when changing `netlify/functions/`.
- Use `netlify dev` (not plain `vite`) locally so `/api/*` reaches the functions.