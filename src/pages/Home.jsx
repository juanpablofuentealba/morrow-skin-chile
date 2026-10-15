import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowDownRight, ArrowRight, CreditCard, ShieldCheck, Truck } from 'lucide-react'
import { products, imageUrl } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Home() {
  const navigate = useNavigate()
  const featured = products.slice(0, 4)

  return (
    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> CUIDADO SUAVE PARA TU PIEL</p>
          <h1 id="hero-title">Menos pasos,<br />más <em>calma.</em></h1>
          <p className="hero-description">Lo esencial para cuidar tu piel, justo como está. Sin rutinas interminables. Hecho para el clima chileno.</p>
          <button className="button button-dark" onClick={() => navigate('/tienda')}>Descubre los esenciales <ArrowRight size={16} /></button>
          <div className="hero-note"><span className="note-mark">01</span><span>Menos, con<br />intención.</span><ArrowDownRight size={19} /></div>
        </div>
        <div className="hero-image-wrap">
          <img className="hero-image" src={imageUrl('photo-1608248543803-ba4f8c70ae0b', 1500)} alt="Productos para el cuidado de la piel con luz cálida de mañana" />
          <div className="hero-stamp"><span>HECHO PARA</span><strong>tu día</strong><span>Y TU PIEL REAL</span></div>
          <div className="hero-caption"><span>RITUAL DE CADA DÍA</span><span>CHILE</span></div>
        </div>
      </section>

      <section className="promise-strip" id="routine" aria-label="Nuestros compromisos">
        <div><span className="promise-number">01</span><span>Ingredientes que cuidan tu piel</span></div>
        <div><span className="promise-number">02</span><span>Rutinas simples, gran bienestar</span></div>
        <div><span className="promise-number">03</span><span>Nunca probados en animales</span></div>
        <span className="promise-flower" aria-hidden="true">✳</span>
      </section>

      <section className="shop-section" id="shop">
        <div className="section-heading">
          <div><p className="eyebrow">CUIDADO DEL BUENO</p><h2>Tus nuevos <em>favoritos.</em></h2></div>
          <div className="section-heading-actions">
            <p>Cuidado consciente para sumar<br className="desktop-break" /> a la vida que ya tienes.</p>
            <Link to="/tienda" className="text-link">Ver todo <ArrowRight size={15} /></Link>
          </div>
        </div>
        <div className="product-grid">
          {featured.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
        </div>
      </section>

      <section className="ritual-band">
        <div className="ritual-image"><img src={imageUrl('photo-1556229010-6c3f2c9ca5f8', 1000)} alt="Un momento de calma en una rutina sencilla para la piel" loading="lazy" /></div>
        <div className="ritual-copy">
          <p className="eyebrow">UNA NOTA DE MORROW</p>
          <h2>Tu rutina debería sentirse como una <em>pausa.</em></h2>
          <p>Hacemos lo que tu piel necesita y dejamos fuera lo que no. Unos pocos buenos pasos y espacio para ser tú.</p>
          <Link to="/sobre-nosotros" className="text-link">La filosofía Morrow <ArrowRight size={15} /></Link>
          <span className="ritual-scribble" aria-hidden="true">siempre con cariño</span>
        </div>
      </section>

      <section className="payments-band" aria-label="Métodos de pago">
        <div className="payments-item"><CreditCard size={22} /><span><strong>Webpay + RedCompra</strong>Tarjetas y débito bancario</span></div>
        <div className="payments-item"><ShieldCheck size={22} /><span><strong>Mercado Pago</strong>Tu saldo y cuotas</span></div>
        <div className="payments-item"><Truck size={22} /><span><strong>Envío a todo Chile</strong>Gratis desde $30.000</span></div>
      </section>
    </main>
  )
}