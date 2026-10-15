import React from 'react'
import { Link } from 'react-router-dom'
import { CreditCard, Truck, ShieldCheck } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="footer">
      <div className="footer-brand">
        <Link className="wordmark footer-wordmark" to="/">morrow<span>skin</span></Link>
        <p>Haz espacio para un día más amable.</p>
      </div>
      <div className="footer-trust">
        <span><CreditCard size={15} /> Webpay · RedCompra</span>
        <span><ShieldCheck size={15} /> Mercado Pago</span>
        <span><Truck size={15} /> Envío a todo Chile</span>
      </div>
      <div className="footer-links">
        <Link to="/sobre-nosotros">Nuestra filosofía</Link>
        <Link to="/tienda#envio">Envíos y devoluciones</Link>
      </div>
      <span className="footer-copy">© {new Date().getFullYear()} Morrow Skin Chile</span>
    </footer>
  )
}