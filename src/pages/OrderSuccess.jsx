import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Check, CreditCard, Package, ArrowRight, Loader2 } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { money } from '../data/products.js'

function readOrder() {
  try {
    return JSON.parse(window.sessionStorage.getItem('morrow-order') || 'null')
  } catch {
    return null
  }
}

export default function OrderSuccess() {
  const { clearCart } = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  const [status, setStatus] = useState('pending') // pending | ok | failed
  const [detail, setDetail] = useState(null)
  const finalized = useRef(false)

  useEffect(() => {
    if (finalized.current) return
    finalized.current = true

    const order = readOrder()
    const params = new URLSearchParams(location.search)

    // Retorno desde Webpay
    const tokenWs = params.get('token_ws')
    if (tokenWs) {
      fetch('/api/webpay-commit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: tokenWs, amount: order?.amount || 0 }),
      })
        .then((res) => res.json())
        .then((data) => {
          const ok = data.ok === true || (data.response && data.response.status === 'AUTHORIZED')
          setStatus(ok ? 'ok' : 'failed')
          setDetail(ok ? data.response : data)
          if (ok) clearCart()
        })
        .catch(() => setStatus('failed'))
      return
    }

    // Retorno desde Mercado Pago (flujo de preferencia simple)
    if (params.get('collection_status') === 'approved') {
      setStatus('ok')
      clearCart()
      return
    }

    // Fallback demo (desde el botón demo)
    if (order && !params.get('external_reference')) {
      setStatus('ok')
      clearCart()
      return
    }

    setStatus('failed')
  }, [location.search, clearCart])

  if (status === 'pending') {
    return (
      <main className="page-hero" style={{ minHeight: 420 }}>
        <div className="order-pending">
          <Loader2 className="spin" size={32} />
          <h1>Confirmando tu pago...</h1>
          <p>Estamos verificando la transacción con la pasarela.</p>
        </div>
      </main>
    )
  }

  const order = readOrder()

  if (status === 'failed') {
    return (
      <main className="page-hero" style={{ minHeight: 420 }}>
        <div className="order-result-icon failed"><span>!</span></div>
        <h1>El pago no se pudo completar</h1>
        <p>La transacción no fue aprobada o se canceló. Puedes volver a intentarlo.</p>
        <div className="order-actions">
          <button className="button button-dark" onClick={() => navigate('/checkout')}>Volver a intentar <ArrowRight size={15} /></button>
          <Link to="/tienda" className="text-link">Seguir comprando</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="page-hero order-success" style={{ minHeight: 520 }}>
      <div className="order-result-icon ok"><Check size={30} /></div>
      <h1>¡Gracias por tu <em>compra!</em></h1>
      <p>Tu pedido está confirmado. Te enviamos los detalles al correo y lo despachamos en 24-48 horas hábiles.</p>

      {order && (
        <div className="order-card">
          <div className="order-card-head"><Package size={16} /> Pedido confirmado</div>
          <div className="order-card-total">Total pagado <strong>{money(order.amount || 0)}</strong></div>
          <p className="order-ship-to">
            {order.shipping?.name} — {order.shipping?.address}, {order.shipping?.city}, {order.shipping?.region}
          </p>
        </div>
      )}

      <div className="order-actions">
        <button className="button button-dark" onClick={() => navigate('/tienda')}>Seguir comprando <ArrowRight size={15} /></button>
        <Link to="/" className="text-link">Volver al inicio</Link>
      </div>
    </main>
  )
}