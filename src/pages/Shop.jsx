import React, { useMemo } from 'react'
import { Truck } from 'lucide-react'
import { categories, products, normalizeText, money, FREE_SHIPPING_THRESHOLD } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import { useUI } from '../context/UIStateContext.jsx'

export default function Shop() {
  const { searchTerm, setSearchTerm } = useUI()
  const [activeCategory, setActiveCategory] = React.useState('Todo')

  const visibleProducts = useMemo(
    () => products.filter((product) => {
      const matchesCategory = activeCategory === 'Todo' || product.category === activeCategory
      const matchesSearch = normalizeText(`${product.name} ${product.detail} ${product.category}`).includes(normalizeText(searchTerm.trim()))
      return matchesCategory && matchesSearch
    }),
    [activeCategory, searchTerm],
  )

  return (
    <main id="top">
      <section className="page-hero shop-page-hero">
        <p className="eyebrow">CUIDADO DEL BUENO</p>
        <h1>Tus nuevos <em>favoritos.</em></h1>
        <p>Catálogo pensado para el cuidado diario de tu piel, con envío a todo Chile.</p>
      </section>

      <section className="shop-section" id="shop">
        <div className="shop-toolbar">
          <div className="category-tabs" role="tablist" aria-label="Filtrar productos por categoría">
            {categories.map((category) => (
              <button
                key={category}
                role="tab"
                aria-selected={activeCategory === category}
                className={activeCategory === category ? 'category-tab selected' : 'category-tab'}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <span className="result-count">{visibleProducts.length} productos</span>
        </div>

        {visibleProducts.length > 0 ? (
          <div className="product-grid">
            {visibleProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
          </div>
        ) : (
          <div className="empty-results">
            <p>No encontramos productos con esa búsqueda.</p>
            <button onClick={() => { setActiveCategory('Todo'); setSearchTerm('') }}>Ver todos los productos</button>
          </div>
        )}
      </section>

      <section className="shipping-info" id="envio" aria-label="Información de envíos">
        <div className="shipping-card wide">
          <Truck size={22} />
          <div>
            <h2>Envíos a todo Chile</h2>
            <p>Envío gratis en pedidos sobre <strong>{money(FREE_SHIPPING_THRESHOLD)}</strong>. Despachamos en 24-48 horas hábiles desde Santiago, vía Starken y Correos de Chile.</p>
          </div>
        </div>
        <div className="shipping-card">
          <h3>Devoluciones</h3>
          <p>Tienes 30 días para devolver productos sin abrir. Escríbenos a hola@morrowskin.cl</p>
        </div>
        <div className="shipping-card">
          <h3>Pago seguro</h3>
          <p>Aceptamos Webpay, RedCompra y Mercado Pago. Todos tus datos de pago van encriptados.</p>
        </div>
      </section>
    </main>
  )
}