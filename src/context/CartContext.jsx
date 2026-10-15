import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'morrow-cart-v1'

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) return JSON.parse(raw)
    } catch {
      /* ignore */
    }
    return []
  })
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    } catch {
      /* ignore */
    }
  }, [cart])

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  function addToCart(product, quantity = 1) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      return existing
        ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
        : [...current, { ...product, quantity }]
    })
  }

  function updateQuantity(productId, change) {
    setCart((current) =>
      current
        .map((item) => item.id === productId ? { ...item, quantity: item.quantity + change } : item)
        .filter((item) => item.quantity > 0),
    )
  }

  function setQuantity(productId, quantity) {
    setCart((current) =>
      quantity <= 0
        ? current.filter((item) => item.id !== productId)
        : current.map((item) => (item.id === productId ? { ...item, quantity } : item)),
    )
  }

  function removeFromCart(productId) {
    setCart((current) => current.filter((item) => item.id !== productId))
  }

  function clearCart() {
    setCart([])
  }

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      subtotal,
      cartOpen,
      setCartOpen,
      addToCart,
      updateQuantity,
      setQuantity,
      removeFromCart,
      clearCart,
    }),
    [cart, cartCount, subtotal, cartOpen],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart debe usarse dentro de <CartProvider>')
  return context
}