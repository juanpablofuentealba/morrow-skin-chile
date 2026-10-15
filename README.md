# Morrow Skin Chile — Tienda de cuidado de la piel

Tienda e-commerce completa para el mercado chileno, construida con **React + Vite** y desplegada en **Netlify**, con **pago en sandbox** mediante **Webpay (Transbank)** y **Mercado Pago**.

## ✨ Características

- **Tienda multipágina** con React Router: Inicio, Tienda, Detalle de producto, Sobre nosotros, Checkout y Confirmación de pedido.
- **Catálogo en CLP** (pesos chilenos) con filtros por categoría y búsqueda (con normalización de acentos).
- **Carrito completo** con persistencia en `localStorage`, panel lateral, control de cantidades e indicador de envío gratis (desde $30.000).
- **Checkout con envío por región** chilena (cálculo de costo de envío según región).
- **Pagos en sandbox**:
  - **Webpay + RedCompra (Transbank)** — integración real contra el ambiente de integración (devuelve URL y token de prueba reales).
  - **Mercado Pago** — lista para conectarse con un access token de prueba.
  - Botón de **pago de demostración** (sin pasarela) para probar el flujo completo.
- **Totalmente responsive** y con diseño limpio tipo editorial.

## 🚀 Despliegue en Netlify

### Opción A — Drag & drop (rápida, sin Git)
1. `npm run build`
2. Arrastra la carpeta `dist/` a la pantalla de "Sites > Drop" de Netlify.

### Opción B — Con Git (recomendada, deploys automáticos)
1. Sube este repositorio a GitHub.
2. En Netlify: **Add new site → Import an existing project → GitHub**.
3. Netlify detecta automáticamente el `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`

El enrutado SPA y las funciones serverless ya están configurados en `netlify.toml`.

## 🔑 Variables de entorno (producación / integración)

Defínelas en **Netlify → Site settings → Environment variables** (o en un `.env` para `netlify dev`). Mira `.env.example`.

| Variable | Descripción | Sandbox (por defecto) |
|---|---|---|
| `TBK_COMMERCE_CODE` | Código de comercio Webpay | `597055555532` (integración) |
| `TBK_API_KEY` | API key Webpay | la de integración (usa el SDK) |
| `TBK_ENV` | `integration` o `production` | `integration` |
| `MP_ACCESS_TOKEN` | Access token Mercado Pago | vacío (desactivado) |
| `MP_PUBLIC_KEY` | Public key Mercado Pago | vacío |
| `MP_ENV` | `sandbox` o `production` | `sandbox` |
| `PUBLIC_SITE_URL` | URL del sitio para URLs de retorno | se autocompleta con `URL` de Netlify |

> Los códigos Webpay de sandbox son públicos y están precargados. Mercado Pago necesita que pegues tu **access token de prueba** (`TEST-...`) para activar el pago.

## 🧪 Probar pagos en sandbox

### Webpay (Transbank)
1. Ve a `/checkout` y elige "Webpay + RedCompra".
2. Serás redirigido al entorno de pruebas de Transbank.
3. Usa las **tarjetas de prueba oficiales** de Transbank (webpay3gint.transbank.cl). Ejemplo exitoso: Número `4051 8841 4004 8894`, CVV `123`, cualquier fecha futura, monto equivalente al total.
4. Al aprobar, Transbank te devuelve a `/confirmacion` donde se confirma la transacción.

### Mercado Pago
1. Define tu `MP_ACCESS_TOKEN` de prueba en Netlify/local.
2. En el sandbox de Mercado Pago usa las **tarjetas de prueba** oficiales (ej. `5031 4332 1540 6351`, CVV `123`, fecha futura).

### Demo
- El botón "Pago de demostración" completa el pedido sin contacto con la pasarela; sirve para probar todo el flujo.

## 💻 Desarrollo local

```bash
npm install
netlify dev   # sirve el frontend + las funciones en http://localhost:8888
```

> Usa `netlify dev` (no `vite` solo) para que `/api/*` apunte a las funciones serverless.

## 📁 Estructura

```
src/
  App.jsx                 # Layout + rutas
  main.jsx                # Entry (BrowserRouter + providers)
  data/products.js        # Catálogo CLP, helpers (money, imageUrl)
  context/                # CartContext (localStorage) + UIStateContext
  components/             # Header, Footer, CartDrawer, Toast, ProductCard
  pages/                  # Home, Shop, ProductDetail, About, Checkout, OrderSuccess
netlify/functions/
  webpay-create.js        # Crear transacción Webpay
  webpay-commit.js        # Confirmar transacción Webpay
  mercadopago-create.js   # Crear preferencia Mercado Pago
  lib/config.js           # Configuración compartida
netlify.toml              # Config de build y redirects
```

## ⚠️ Pasos para pasar a producción

1. **Transbank**: contratar Webpay Plus, actualizar `TBK_COMMERCE_CODE`, `TBK_API_KEY` y `TBK_ENV=production`. El sandbox no cobra comisiones ni requiere contrato.
2. **Mercado Pago**: generar credentials de producción (`APP_USR-...`) y definir `MP_ENV=production`.
3. Asegurar el sitio con **HTTPS** (Netlify lo hace automático).
4. Opcional: webhooks reales para sincronizar estados de pedido en producción.

---

El catálogo y los textos de marca son contenido de muestra. Las fotografías se cargan desde Unsplash y requieren internet.