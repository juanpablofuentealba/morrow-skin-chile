import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, ShieldCheck, Truck, Wallet } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { useUI } from '../context/UIStateContext.jsx'
import { money, FREE_SHIPPING_THRESHOLD } from '../data/products.js'

const SHIPPING_COST_BY_REGION = {
  'Metropolitana de Santiago': 3000,
  'Valparaíso': 4000,
  'O\'Higgins': 4000,
  'Maule': 4500,
  'Biobío': 4500,
  'La Araucanía': 5000,
  'Los Lagos': 5500,
  'Los Ríos': 5500,
  'Aysén': 7000,
  'Magallanes': 8000,
  'Coquimbo': 4500,
  'Atacama': 5000,
  'Antofagasta': 5500,
  'Tarapacá': 6000,
  'Arica y Parinacota': 6000,
  'Ñuble': 4500,
  'Otra': 5000,
}

const REGIONS = Object.keys(SHIPPING_COST_BY_REGION)

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart()
  const { showNotice } = useUI()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    region: 'Metropolitana de Santiago', city: '', address: '',
  })
  const [paying, setPaying] = useState('')

  if (cart.length === 0) {
    return (
      <main className="page-hero" style={{ minHeight: 420 }}>
        <h1>Tu bolsa está vacía</h1>
        <p>Agrega productos para continuar con el pago.</p>
        <button className="button button-dark" onClick={() => navigate('/tienda')}>Ir a la tienda</button>
      </main>
    )
  }

  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : (SHIPPING_COST_BY_REGION[form.region] || 0)
  const total = subtotal + shippingCost

  function update(field, value) {
    const next = { ...form, [field]: value }
    setForm(next)
    window.sessionStorage.setItem('morrow-checkout', JSON.stringify(next))
  }

  function validate() {
    if (!form.name || !form.email || !form.city || !form.address || !form.phone) {
      showNotice('Completa todos los campos de envío, por favor.')
      return false
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      showNotice('Ingresa un correo válido.')
      return false
    }
    return true
  }

  function buildOrder() {
    return {
      amount: total,
      items: cart.map(({ id, name, price, quantity }) => ({ id, name, price, quantity, line_total: price * quantity })),
      shipping: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        region: form.region,
        city: form.city,
        address: form.address,
        cost: shippingCost,
      },
    }
  }

  async function payWebpay() {
    if (!validate()) return
    setPaying('webpay')
    try {
      const res = await fetch('/api/webpay-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildOrder()),
      })
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error || 'No se pudo iniciar el pago')
      // Guardamos la orden local para el retorno
      window.sessionStorage.setItem('morrow-order', JSON.stringify(buildOrder()))
      window.location.href = data.url
    } catch (error) {
      setPaying('')
      showNotice(error.message)
    }
  }

  async function payMercadoPago() {
    if (!validate()) return
    setPaying('mercadopago')
    try {
      const res = await fetch('/api/mercadopago-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildOrder()),
      })
      const data = await res.json()
      if (!res.ok || !data.init_point) throw new Error(data.error || 'No se pudo iniciar el pago')
      window.sessionStorage.setItem('morrow-order', JSON.stringify(buildOrder()))
      window.location.href = data.init_point
    } catch (error) {
      setPaying('')
      showNotice(error.message)
    }
  }

  function payDemo() {
    if (!validate()) return
    window.sessionStorage.setItem('morrow-order', JSON.stringify(buildOrder()))
    navigate('/confirmacion')
  }

  return (
    <main id="top" className="checkout-main">
      <div className="breadcrumb">
        <button className="breadcrumb-back" onClick={() => navigate(-1)}><ArrowLeft size={15} /> Volver</button>
      </div>
      <h1 className="checkout-title">Finalizar <em>compra</em></h1>

      <div className="checkout-layout">
        <section className="checkout-form">
          <h2>Datos de envío</h2>
          <div className="form-grid">
            <label className="field field-full"><span>Nombre completo</span><input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Ej: María Pérez" /></label>
            <label className="field"><span>Correo electrónico</span><input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="tu@correo.cl" /></label>
            <label className="field"><span>Teléfono</span><input value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+56 9 ..." /></label>
            <label className="field"><span>Región</span>
              <select value={form.region} onChange={(e) => update('region', e.target.value)}>
                {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </label>
            <label className="field"><span>Ciudad / Comuna</span><input value={form.city} onChange={(e) => update('city', e.target.value)} placeholder="Ej: Providencia" /></label>
            <label className="field field-full"><span>Dirección</span><input value={form.address} onChange={(e) => update('address', e.target.value)} placeholder="Calle, número, depto" /></label>
          </div>
        </section>

        <aside className="checkout-summary">
          <h2>Resumen del pedido</h2>
          <div className="co-items">
            {cart.map((item) => (
              <div className="co-item" key={item.id}>
                <span>{item.quantity} × {item.name}</span>
                <strong>{money(item.price * item.quantity)}</strong>
              </div>
            ))}
          </div>
          <div className="co-lines">
            <div><span>Subtotal</span><span>{money(subtotal)}</span></div>
            <div><span>Envío ({form.region})</span><span>{shippingCost === 0 ? <em className="free">GRATIS</em> : money(shippingCost)}</span></div>
            <div className="co-total"><span>Total</span><strong>{money(total)}</strong></div>
          </div>

          <div className="pay-methods">
            <button className="pay-method" onClick={payWebpay} disabled={!!paying}>
              {paying === 'webpay' ? <span className="spinner" /> : <CreditCard size={18} />}
              <span><strong>Webpay + RedCompra</strong>Tarjetas de crédito y débito</span>
            </button>
            <button className="pay-method" onClick={payMercadoPago} disabled={!!paying}>
              {paying === 'mercadopago' ? <span className="spinner" /> : <Wallet size={18} />}
              <span><strong>Mercado Pago</strong>Saldo, tarjetas y cuotas</span>
            </button>
            <button className="pay-method pay-method-demo" onClick={payDemo} disabled={!!paying}>
              <ShieldCheck size={18} />
              <span><strong>Pago de demostración</strong>Sin conexión a pasarela (sandbox)</span>
            </button>
            <p className="pay-note"><Truck size={14} /> El envío se calcula según la región. Los métodos Webpay y Mercado Pago están en modo de prueba (sandbox).</p>
          </div>
        </aside>
      </div>
    </main>
  )
}