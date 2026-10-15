import React from 'react'
import { Check } from 'lucide-react'
import { useUI } from '../context/UIStateContext.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function Toast() {
  const { notice } = useUI()
  const { setCartOpen } = useCart()

  if (!notice) return null

  return (
    <div className="toast" role="status">
      <Check size={17} />
      {notice}
      <button className="toast-action" onClick={() => setCartOpen(true)}>Ver bolsa</button>
    </div>
  )
}