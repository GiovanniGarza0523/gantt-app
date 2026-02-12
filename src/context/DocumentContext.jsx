import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { createDefaultDocument } from '../data/mockData.js'
import { loadDocument, saveDocument } from '../utils/storage.js'

const DocumentContext = createContext(null)

export function DocumentProvider({ children }) {
  const [doc, setDoc] = useState(() => {
    const saved = loadDocument()
    return saved || createDefaultDocument('commercial')
  })
  const [editMode, setEditMode] = useState(true)
  const [showFieldSheet, setShowFieldSheet] = useState(false)

  useEffect(() => {
    saveDocument(doc)
  }, [doc])

  const updateDoc = useCallback((updates) => {
    setDoc((prev) => ({ ...prev, ...updates }))
  }, [])

  const updateBlock = useCallback((blockId, data) => {
    setDoc((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) =>
        b.id === blockId ? { ...b, data: { ...b.data, ...data } } : b
      ),
    }))
  }, [])

  const toggleBlockVisibility = useCallback((blockId) => {
    setDoc((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) =>
        b.id === blockId ? { ...b, visible: !b.visible } : b
      ),
    }))
  }, [])

  const reorderBlocks = useCallback((newBlocks) => {
    setDoc((prev) => ({ ...prev, blocks: newBlocks }))
  }, [])

  const switchTemplate = useCallback((template) => {
    setDoc((prev) => ({ ...prev, template }))
  }, [])

  const resetDocument = useCallback((template) => {
    setDoc(createDefaultDocument(template || 'commercial'))
  }, [])

  const value = {
    doc,
    editMode,
    setEditMode,
    showFieldSheet,
    setShowFieldSheet,
    updateDoc,
    updateBlock,
    toggleBlockVisibility,
    reorderBlocks,
    switchTemplate,
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
