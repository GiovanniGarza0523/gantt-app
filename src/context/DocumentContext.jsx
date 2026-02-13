import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { createDefaultDocument, TRADES } from '../data/mockData.js'
import { loadDocument, saveDocument } from '../utils/storage.js'

const DocumentContext = createContext(null)

export function DocumentProvider({ children }) {
  const [doc, setDoc] = useState(() => {
    const saved = loadDocument()
    if (saved && saved.trade && saved.lineItems) return saved
    return createDefaultDocument('landscaping')
  })
  const [editMode, setEditMode] = useState(true)
  const [showFieldSheet, setShowFieldSheet] = useState(false)

  useEffect(() => {
    saveDocument(doc)
  }, [doc])

  const trade = TRADES[doc.trade] || TRADES.landscaping

  const updateDoc = useCallback((updates) => {
    setDoc((prev) => ({ ...prev, ...updates }))
  }, [])

  const switchTrade = useCallback((tradeId) => {
    const t = TRADES[tradeId]
    if (!t) return
    setDoc((prev) => ({
      ...prev,
      trade: tradeId,
      terms: t.defaultTerms,
    }))
  }, [])

  const addLineItem = useCallback(() => {
    setDoc((prev) => ({
      ...prev,
      lineItems: [...prev.lineItems, { description: '', qty: 1, unitCost: 0 }],
    }))
  }, [])

  const updateLineItem = useCallback((index, field, value) => {
    setDoc((prev) => ({
      ...prev,
      lineItems: prev.lineItems.map((item, i) =>
        i === index
          ? { ...item, [field]: field === 'description' ? value : Number(value) || 0 }
          : item
      ),
    }))
  }, [])

  const removeLineItem = useCallback((index) => {
    setDoc((prev) => ({
      ...prev,
      lineItems: prev.lineItems.filter((_, i) => i !== index),
    }))
  }, [])

  const resetDocument = useCallback((tradeId) => {
    setDoc(createDefaultDocument(tradeId || doc.trade || 'landscaping'))
  }, [doc.trade])

  const value = {
    doc,
    trade,
    editMode,
    setEditMode,
    showFieldSheet,
    setShowFieldSheet,
    updateDoc,
    switchTrade,
    addLineItem,
    updateLineItem,
    removeLineItem,
    resetDocument,
  }

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  )
}

export function useDocument() {
  const context = useContext(DocumentContext)
  if (!context) {
    throw new Error('useDocument must be used within a DocumentProvider')
  }
  return context
}
