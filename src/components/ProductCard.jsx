import React from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { useUI } from '../context/UIStateContext.jsx'
import { imageUrl, money } from '../data/products.js'

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart()
  const { showNotice } = useUI()

  return (
    <article className="product-card">
      <Link to={`/producto/${product.slug}`} className="product-image-link">
        <div className={`product-image-frame ${product.tone}`}>
          {product.tag && <span className="product-tag">{product.tag}</span>}
          <img src={imageUrl(product.image, 850)} alt={product.name} loading="lazy" />
          <button
            className="quick-add"
            aria-label={`Añadir ${product.name} a la bolsa`}
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              addToCart(product)
              showNotice(`${product.name} se añadió a la bolsa`)
            }}
          >
            <Plus size={19} />
          </button>
          <span className="product-index">0{index + 1}</span>
        </div>
        <div className="product-info">
          <div><h3>{product.name}</h3><p>{product.detail}</p></div>
          <span className="product-price">{money(product.price)}</span>
        </div>
      </Link>
    </article>
  )
}