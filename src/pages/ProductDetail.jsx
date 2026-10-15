import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CreditCard, Minus, Plus, ShieldCheck, Truck } from 'lucide-react'
import { getProductBySlug, imageUrl, money, products } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'
import { useUI } from '../context/UIStateContext.jsx'
import ProductCard from '../components/ProductCard.jsx'

export default function ProductDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const product = getProductBySlug(slug)
  const { addToCart, setCartOpen } = useCart()
  const { showNotice } = useUI()
  const [quantity, setQuantity] = React.useState(1)

  if (!product) {
    return (
      <main className="page-hero" style={{ minHeight: 320 }}>
        <h1>Producto no encontrado</h1>
        <Link to="/tienda" className="button button-dark">Volver a la tienda</Link>
      </main>
    )
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  function handleAdd() {
    addToCart(product, quantity)
    showNotice(`${quantity} × ${product.name} se añadió a la bolsa`)
    setCartOpen(true)
  }

  return (
    <main id="top" className="detail-main">
      <div className="breadcrumb">
        <Link to="/tienda"><ArrowLeft size={15} /> Volver a la tienda</Link>
      </div>

      <section className="product-detail">
        <div className="product-detail-gallery">
          <div className={`product-detail-image ${product.tone}`}>
            {product.tag && <span className="product-tag">{product.tag}</span>}
            <img src={imageUrl(product.image, 900)} alt={product.name} />
          </div>
        </div>
        <div className="product-detail-info">
          <p className="eyebrow">{product.category.toUpperCase()}</p>
          <h1>{product.name}</h1>
          <p className="detail-description">{product.description}</p>

          <div className="detail-price-actions">
            <span className="detail-price">{money(product.price)}</span>
            <div className="detail-buy-row">
              <div className="quantity-control quantity-lg">
                <button aria-label="Bajar cantidad" onClick={() => setQuantity((q) => Math.max(1, q - 1))}><Minus size={15} /></button>
                <span>{quantity}</span>
                <button aria-label="Subir cantidad" onClick={() => setQuantity((q) => q + 1)}><Plus size={15} /></button>
              </div>
              <button className="button button-dark detail-add" onClick={handleAdd}>Agregar a la bolsa <ArrowRight size={16} /></button>
            </div>
          </div>

          <div className="detail-trust">
            <div><CreditCard size={16} /><span>Webpay · RedCompra</span></div>
            <div><ShieldCheck size={16} /><span>Mercado Pago</span></div>
            <div><Truck size={16} /><span>Envío a todo Chile</span></div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="related-section">
          <div className="section-heading">
            <div><p className="eyebrow">COMPLETA TU RUTINA</p><h2>También te puede <em>gustar.</em></h2></div>
          </div>
          <div className="product-grid">
            {related.map((p, index) => <ProductCard key={p.id} product={p} index={index} />)}
          </div>
        </section>
      )}
    </main>
  )
}