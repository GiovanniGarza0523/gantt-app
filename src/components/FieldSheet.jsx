import { X } from 'lucide-react'
import { useDocument } from '../context/DocumentContext.jsx'

export default function FieldSheet() {
  const { doc, trade, setShowFieldSheet } = useDocument()

  const handlePrint = () => {
    window.print()
  }

  const blankLine = (label, width = 'w-full') => (
    <div className="mb-4">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <div className={`${width} border-b-2 border-slate-300`} style={{ height: '28px' }} />
    </div>
  )

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-auto bg-slate-900/50">
      {/* Close button (no-print) */}
      <div className="no-print fixed right-4 top-4 z-[110] flex gap-2">
        <button
          onClick={handlePrint}
          className="rounded-lg px-4 py-2 text-sm font-medium text-white"
          style={{ backgroundColor: trade.primaryColor }}
        >
          Print Sheet
        </button>
        <button
          onClick={() => setShowFieldSheet(false)}
          className="rounded-full bg-white p-2 shadow-lg hover:bg-slate-100"
        >
          <X size={20} />
        </button>
      </div>

      {/* Printable Sheet */}
      <div className="print-target my-8 bg-white" style={{ width: '8.5in', minHeight: '11in', padding: '0.6in' }}>
        {/* Header */}
        <div className="mb-6 flex items-center justify-between border-b-4 pb-4" style={{ borderColor: trade.primaryColor }}>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: trade.textColor }}>
              {doc.companyName || 'Your Business Name'}
            </h1>
            <p className="text-sm text-slate-500">
              {[doc.companyPhone, doc.companyEmail].filter(Boolean).join(' | ')}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold" style={{ color: trade.primaryColor }}>
              FIELD SHEET
            </p>
            <p className="text-xs text-slate-400">Date: _______________</p>
          </div>
        </div>

        {/* Client Section */}
        <div className="mb-6">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: trade.primaryColor }}
          >
            Client Information
          </h2>
          <div className="grid grid-cols-2 gap-x-6">
            {blankLine('Client Name')}
            {blankLine('Phone')}
            {blankLine('Address')}
            {blankLine('Email')}
            {blankLine('City / State / ZIP')}
            {blankLine('Referred By')}
          </div>
        </div>

        {/* Job Details */}
        <div className="mb-6">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: trade.primaryColor }}
          >
            Job Details
          </h2>
          <div className="grid grid-cols-2 gap-x-6">
            {blankLine('Job Type')}
            {blankLine('Estimated Start Date')}
            {blankLine('Location / Area')}
            {blankLine('Estimated Duration')}
          </div>
          <div className="mt-2">
            {blankLine('Description / Scope of Work')}
            {blankLine('')}
            {blankLine('')}
          </div>
        </div>

        {/* Measurements / Sketch Area */}
        <div className="mb-6">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: trade.primaryColor }}
          >
            Measurements & Sketch Area
          </h2>
          <div
            className="rounded border-2 border-slate-300"
            style={{
              height: '200px',
              backgroundImage:
                'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
        </div>

        {/* Checklist */}
        <div className="mb-6">
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: trade.primaryColor }}
          >
            Job-Site Checklist
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              'Photos taken',
              'Measurements recorded',
              'Utilities located',
              'Access points identified',
              'Existing conditions noted',
              'Client signature obtained',
              'Permits discussed',
              'Timeline reviewed',
            ].map((item) => (
              <label key={item} className="flex items-center gap-2 text-sm text-slate-600">
                <span className="inline-block h-4 w-4 rounded border-2 border-slate-400" />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <h2
            className="mb-3 text-sm font-bold uppercase tracking-wider"
            style={{ color: trade.primaryColor }}
          >
            Additional Notes
          </h2>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="mb-4 border-b border-slate-200" style={{ height: '28px' }} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 border-t-2 pt-3 text-center" style={{ borderColor: trade.primaryColor }}>
          <p className="text-xs text-slate-400">
            {doc.companyName}{doc.companyPhone ? ` | ${doc.companyPhone}` : ''}{doc.companyEmail ? ` | ${doc.companyEmail}` : ''}
          </p>
        </div>
      </div>
    </div>
  )
}
