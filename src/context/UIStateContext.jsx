import React, { createContext, useContext, useMemo, useState } from 'react'

const UIContext = createContext(null)

let noticeTimer = null

export function UIProvider({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [notice, setNotice] = useState('')

  function showNotice(message, action = null) {
    setNotice(message)
    window.clearTimeout(noticeTimer)
    noticeTimer = window.setTimeout(() => setNotice(''), 2600)
  }

  const value = useMemo(
    () => ({
      menuOpen,
      setMenuOpen,
      searchOpen,
      setSearchOpen,
      searchTerm,
      setSearchTerm,
      notice,
      showNotice,
    }),
    [menuOpen, searchOpen, searchTerm, notice],
  )

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export function useUI() {
  const context = useContext(UIContext)
  if (!context) throw new Error('useUI debe usarse dentro de <UIProvider>')
  return context
}