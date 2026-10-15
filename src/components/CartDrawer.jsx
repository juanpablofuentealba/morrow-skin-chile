import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { useUI } from '../context/UIStateContext.jsx'
import { money, imageUrl, FREE_SHIPPING_THRESHOLD } from '../data/products.js'

export default function CartDrawer() {
  const { cart, cartCount, subtotal, cartOpen, setCartOpen, updateQuantity } = useCart()
  const { showNotice } = useUI()
  const navigate = useNavigate()

  if (!cartOpen) return null

  const remaining = FREE_SHIPPING_THRESHOLD - subtotal
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)

  function goToCheckout() {
    setCartOpen(false)
    navigate('/checkout')
  }

  return (
    <div className="drawer-layer" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false) }}>
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="drawer-header">
          <div>
            <p className="eyebrow">TU PEQUEÑO RITUAL</p>
            <h2 id="cart-title">Tu bolsa <span>({cartCount})</span></h2>
          </div>
          <button className="icon-button" aria-label="Cerrar bolsa" onClick={() => setCartOpen(false)}><X size={20} /></button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <div className="empty-bag-icon"><ShoppingBag size={24} /></div>
            <h3>Un espacio para algo bueno.</h3>
            <p>Tu bolsa espera algo especial.</p>
            <button className="button button-dark" onClick={() => { setCartOpen(false); navigate('/tienda') }}>
              Ver los esenciales <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={imageUrl(item.image, 240)} alt="" />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>{money(item.price)}</p>
                    <div className="quantity-control">
                      <button aria-label={`Quitar una unidad de ${item.name}`} onClick={() => updateQuantity(item.id, -1)}><Minus size={13} /></button>
                      <span>{item.quantity}</span>
                      <button aria-label={`Añadir una unidad de ${item.name}`} onClick={() => updateQuantity(item.id, 1)}><Plus size={13} /></button>
                    </div>
                  </div>
                  <span className="cart-line-total">{money(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="shipping-progress">
                <span>
                  {remaining <= 0
                    ? '🎉 ¡Ya tienes envío gratis!'
                    : `Te faltan ${money(remaining)} para el envío gratis`}
                </span>
                <div><span style={{ width: `${progress}%` }} /></div>
              </div>
              <div className="subtotal-row"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
              <p className="tax-note">El envío se calcula al finalizar la compra.</p>
              <button className="button button-dark checkout-button" onClick={goToCheckout}>
                Ir a pagar <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}