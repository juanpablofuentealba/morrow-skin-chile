import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Search, ShoppingBag, X, Sparkles } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { useUI } from '../context/UIStateContext.jsx'

export default function Header() {
  const { cartCount, setCartOpen } = useCart()
  const { menuOpen, setMenuOpen, searchOpen, setSearchOpen, searchTerm, setSearchTerm } = useUI()

  return (
    <>
      <div className="announcement">
        <Sparkles size={13} strokeWidth={1.7} />
        Más cuidado, menos complicaciones
        <span>Envío gratis desde $30.000 · Pagos con Webpay y Mercado Pago</span>
      </div>
      <header className="site-header">
        <button
          className="icon-button mobile-menu"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => { setMenuOpen((open) => !open); setSearchOpen(false) }}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link className="wordmark" to="/" aria-label="Inicio de Morrow Skin">morrow<span>skin</span></Link>

        <nav className="main-nav" aria-label="Navegación principal">
          <NavLink to="/tienda">Comprar</NavLink>
          <NavLink to="/sobre-nosotros">Nuestra filosofía</NavLink>
          <NavLink to="/tienda#envio">Envíos</NavLink>
        </nav>

        <div className="header-actions">
          <button
            className="icon-button search-toggle"
            aria-label="Buscar productos"
            onClick={() => { setSearchOpen((open) => !open); setMenuOpen(false) }}
          >
            <Search size={19} />
          </button>
          <button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`Bolsa de compra, ${cartCount} ${cartCount === 1 ? 'artículo' : 'artículos'}`}>
            <ShoppingBag size={18} />
            <span>Bolsa</span>
            <span className="bag-count">{cartCount}</span>
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav className="mobile-nav-panel" id="mobile-nav" aria-label="Navegación móvil">
          <Link to="/tienda" onClick={() => setMenuOpen(false)}>Comprar</Link>
          <Link to="/sobre-nosotros" onClick={() => setMenuOpen(false)}>Nuestra filosofía</Link>
          <Link to="/tienda#envio" onClick={() => setMenuOpen(false)}>Envíos</Link>
        </nav>
      )}

      {searchOpen && (
        <div className="search-bar">
          <Search size={18} />
          <input
            autoFocus
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Busca tu próximo esencial"
            aria-label="Buscar productos"
          />
          <button
            className="icon-button"
            onClick={() => { setSearchOpen(false); setSearchTerm('') }}
            aria-label="Cerrar búsqueda"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </>
  )
}