import { useState, useRef } from 'react'
import {
  Share2,
  Printer,
  Eye,
  Edit3,
  Download,
  Upload,
  RotateCcw,
  FileText,
} from 'lucide-react'
import { useDocument } from '../context/DocumentContext.jsx'
import { exportDocument, importDocument } from '../utils/storage.js'
import { shareOrDownloadPDF } from '../utils/pdf.js'

export default function ActionBar() {
  const { doc, trade, editMode, setEditMode, setShowFieldSheet, updateDoc, resetDocument } = useDocument()
  const [generating, setGenerating] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const fileInputRef = useRef(null)

  const handleExportPDF = async () => {
    setGenerating(true)
    setEditMode(false)
    await new Promise((r) => setTimeout(r, 300))
    try {
      const el = document.getElementById('pdf-target')
      await shareOrDownloadPDF(el, `estimate-${doc.clientName || 'draft'}.pdf`)
    } catch (err) {
      console.error('PDF generation failed:', err)
    }
    setGenerating(false)
  }

  const handleImport = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const imported = await importDocument(file)
      updateDoc(imported)
    } catch (err) {
      alert(err.message)
    }
    e.target.value = ''
  }

  return (
    <div className="no-print fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white shadow-lg">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-2.5">
        {/* Left: branding */}
        <div className="flex items-center gap-1.5">
          <FileText size={18} style={{ color: trade.primaryColor }} />
          <span className="text-sm font-bold text-slate-700">BidBuilder</span>
        </div>

        {/* Center: main actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditMode(!editMode)}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            {editMode ? <Eye size={16} /> : <Edit3 size={16} />}
            <span className="hidden sm:inline">{editMode ? 'Preview' : 'Edit'}</span>
          </button>

          <button
            onClick={() => setShowFieldSheet(true)}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            <Printer size={16} />
            <span className="hidden sm:inline">Field Sheet</span>
          </button>

          <button
            onClick={handleExportPDF}
            disabled={generating}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-white"
            style={{ backgroundColor: generating ? '#94a3b8' : trade.primaryColor }}
          >
            <Share2 size={16} />
            <span className="hidden sm:inline">{generating ? 'Generating...' : 'Send PDF'}</span>
          </button>
        </div>

        {/* Right: more options */}
        <div className="relative">
          <button
            onClick={() => setShowMore(!showMore)}
            className="rounded-lg px-2 py-2 text-sm text-slate-500 hover:bg-slate-100"
          >
            ...
          </button>
          {showMore && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowMore(false)} />
              <div className="absolute bottom-full right-0 z-50 mb-2 w-48 rounded-lg border border-slate-200 bg-white py-1 shadow-xl">
                <button
                  onClick={() => { exportDocument(doc); setShowMore(false) }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <Download size={14} /> Export Backup
                </button>
                <button
                  onClick={() => { fileInputRef.current?.click(); setShowMore(false) }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <Upload size={14} /> Import Backup
                </button>
                <hr className="my-1 border-slate-100" />
                <button
                  onClick={() => {
                    if (window.confirm('Start fresh? This clears everything.')) {
                      resetDocument()
                      setShowMore(false)
                    }
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <RotateCcw size={14} /> Reset
                </button>
              </div>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleImport}
          />
        </div>
      </div>
    </div>
  )
}
