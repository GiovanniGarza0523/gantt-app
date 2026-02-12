import { useState, useRef } from 'react'
import {
  FileText,
  Download,
  Upload,
  Share2,
  Printer,
  Eye,
  Edit3,
  ChevronUp,
  ChevronDown,
  RotateCcw,
  HardHat,
  Leaf,
} from 'lucide-react'
import { useDocument } from '../context/DocumentContext.jsx'
import { TEMPLATES } from '../data/mockData.js'
import { exportDocument, importDocument } from '../utils/storage.js'
import { shareOrDownloadPDF } from '../utils/pdf.js'

export default function Sidebar() {
  const {
    doc,
    editMode,
    setEditMode,
    setShowFieldSheet,
    switchTemplate,
    updateDoc,
    resetDocument,
  } = useDocument()
  const theme = TEMPLATES[doc.template]
  const [mobileOpen, setMobileOpen] = useState(false)
  const [generating, setGenerating] = useState(false)
  const fileInputRef = useRef(null)

  const handleExportPDF = async () => {
    setGenerating(true)
    setEditMode(false)
    // Wait for re-render to remove edit UI
    await new Promise((r) => setTimeout(r, 300))
    try {
      const el = document.getElementById('pdf-target')
      await shareOrDownloadPDF(el, `proposal-${doc.clientName || 'draft'}.pdf`)
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

  const sidebarContent = (
    <div className="flex flex-col gap-4 p-4">
      {/* Logo / Brand */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <FileText size={24} style={{ color: theme.primaryColor }} />
        <div>
          <h1 className="text-lg font-bold text-slate-800">BidBuilder</h1>
          <p className="text-xs text-slate-400">Professional Proposals</p>
        </div>
      </div>

      {/* Company Info */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Company Details
        </p>
        <input
          type="text"
          value={doc.companyName}
          onChange={(e) => updateDoc({ companyName: e.target.value })}
          className="touch-input w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
          placeholder="Company Name"
        />
        <input
          type="text"
          value={doc.companyTagline}
          onChange={(e) => updateDoc({ companyTagline: e.target.value })}
          className="w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
          placeholder="Tagline"
        />
        <input
          type="text"
          value={doc.companyPhone}
          onChange={(e) => updateDoc({ companyPhone: e.target.value })}
          className="w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
          placeholder="Phone"
        />
        <input
          type="text"
          value={doc.companyEmail}
          onChange={(e) => updateDoc({ companyEmail: e.target.value })}
          className="w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
          placeholder="Email"
        />
      </div>

      {/* Client Info */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Client Details
        </p>
        <input
          type="text"
          value={doc.clientName}
          onChange={(e) => updateDoc({ clientName: e.target.value })}
          className="touch-input w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
          placeholder="Client Name"
        />
        <input
          type="text"
          value={doc.clientAddress}
          onChange={(e) => updateDoc({ clientAddress: e.target.value })}
          className="w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
          placeholder="Address"
        />
        <input
          type="text"
          value={doc.clientPhone}
          onChange={(e) => updateDoc({ clientPhone: e.target.value })}
          className="w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
          placeholder="Client Phone"
        />
        <input
          type="text"
          value={doc.clientEmail}
          onChange={(e) => updateDoc({ clientEmail: e.target.value })}
          className="w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
          placeholder="Client Email"
        />
        <input
          type="date"
          value={doc.projectDate}
          onChange={(e) => updateDoc({ projectDate: e.target.value })}
          className="w-full rounded border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
        />
      </div>

      {/* Template Switcher */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Template
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => switchTemplate('commercial')}
            className={`flex items-center gap-2 rounded-lg border-2 px-3 py-2 text-sm font-medium transition ${
              doc.template === 'commercial'
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <HardHat size={16} /> Contractor
          </button>
          <button
            onClick={() => switchTemplate('residential')}
            className={`flex items-center gap-2 rounded-lg border-2 px-3 py-2 text-sm font-medium transition ${
              doc.template === 'residential'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <Leaf size={16} /> Landscaper
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2 border-t border-slate-200 pt-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Tools
        </p>
        <button
          onClick={() => setEditMode(!editMode)}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          {editMode ? <Eye size={16} /> : <Edit3 size={16} />}
          {editMode ? 'Preview Mode' : 'Edit Mode'}
        </button>
        <button
          onClick={() => setShowFieldSheet(true)}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          <Printer size={16} /> Print Field Sheet
        </button>
        <button
          onClick={handleExportPDF}
          disabled={generating}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white transition"
          style={{ backgroundColor: generating ? '#94a3b8' : theme.primaryColor }}
        >
          <Share2 size={16} />
          {generating ? 'Generating...' : 'Share / Download PDF'}
        </button>
      </div>

      {/* Backup */}
      <div className="space-y-2 border-t border-slate-200 pt-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Backup
        </p>
        <button
          onClick={() => exportDocument(doc)}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          <Download size={16} /> Export JSON
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          <Upload size={16} /> Import JSON
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleImport}
        />
        <button
          onClick={() => {
            if (window.confirm('Reset document to defaults? This cannot be undone.')) {
              resetDocument(doc.template)
            }
          }}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <RotateCcw size={16} /> Reset Document
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="no-print hidden lg:block lg:w-80 lg:shrink-0 lg:overflow-y-auto lg:border-r lg:border-slate-200 lg:bg-white">
        {sidebarContent}
      </aside>

      {/* Mobile Bottom Sheet */}
      <div className="no-print fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex w-full items-center justify-center gap-2 border-t border-slate-200 bg-white px-4 py-3 font-medium text-slate-700 shadow-lg"
          style={{ borderTopColor: theme.primaryColor }}
        >
          {mobileOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          <FileText size={18} style={{ color: theme.primaryColor }} />
          BidBuilder Tools
        </button>
        {mobileOpen && (
          <div className="max-h-[70vh] overflow-y-auto border-t border-slate-200 bg-white shadow-2xl">
            {sidebarContent}
          </div>
        )}
      </div>
    </>
  )
}
