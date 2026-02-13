const STORAGE_KEY = 'bidbuilder_document'

export function loadDocument() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveDocument(doc) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(doc))
  } catch {
    // localStorage full or unavailable
  }
}

export function exportDocument(doc) {
  const blob = new Blob([JSON.stringify(doc, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `bidbuilder-backup-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function importDocument(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const doc = JSON.parse(e.target.result)
        if (doc.docId && doc.lineItems) {
          resolve(doc)
        } else {
          reject(new Error('Invalid BidBuilder document'))
        }
      } catch {
        reject(new Error('Invalid JSON file'))
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}
