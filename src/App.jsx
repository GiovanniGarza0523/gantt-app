import * as LucideIcons from 'lucide-react'
import { useDocument } from './context/DocumentContext.jsx'
import { TRADES } from './data/mockData.js'
import EstimateTable from './components/EstimateTable.jsx'
import SignatureLine from './components/SignatureLine.jsx'
import ActionBar from './components/ActionBar.jsx'
import FieldSheet from './components/FieldSheet.jsx'

function App() {
  const { doc, trade, editMode, showFieldSheet, updateDoc, switchTrade } = useDocument()

  return (
    <div className="min-h-screen bg-slate-100 pb-20 font-sans">
      {/* The document */}
      <div className="mx-auto max-w-2xl px-4 pt-6">
        <div id="pdf-target" className="rounded-xl bg-white p-6 shadow-md sm:p-8">

          {/* ── Trade Picker (edit mode only) ── */}
          {editMode && (
            <div className="no-print mb-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Your Trade
              </p>
              <div className="flex flex-wrap gap-2">
                {Object.values(TRADES).map((t) => {
                  const Icon = LucideIcons[t.icon] || LucideIcons.Briefcase
                  const active = doc.trade === t.id
                  return (
                    <button
                      key={t.id}
                      onClick={() => switchTrade(t.id)}
                      className={`flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-sm font-medium transition ${
                        active
                          ? 'text-white'
                          : 'border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                      style={active ? { borderColor: t.primaryColor, backgroundColor: t.primaryColor } : {}}
                    >
                      <Icon size={14} />
                      {t.name}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── Company Header ── */}
          <div
            className="mb-6 border-b-2 pb-4"
            style={{ borderColor: trade.primaryColor }}
          >
            {editMode ? (
              <div className="space-y-1.5">
                <input
                  type="text"
                  value={doc.companyName}
                  onChange={(e) => updateDoc({ companyName: e.target.value })}
                  className="w-full text-xl font-bold outline-none placeholder-slate-300"
                  style={{ color: trade.textColor }}
                  placeholder="Your Business Name"
                />
                <div className="flex flex-wrap gap-3">
                  <input
                    type="text"
                    value={doc.companyPhone}
                    onChange={(e) => updateDoc({ companyPhone: e.target.value })}
                    className="w-40 text-sm text-slate-500 outline-none placeholder-slate-300"
                    placeholder="Phone"
                  />
                  <input
                    type="text"
                    value={doc.companyEmail}
                    onChange={(e) => updateDoc({ companyEmail: e.target.value })}
                    className="w-48 text-sm text-slate-500 outline-none placeholder-slate-300"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    value={doc.companyLicense}
                    onChange={(e) => updateDoc({ companyLicense: e.target.value })}
                    className="w-40 text-sm text-slate-500 outline-none placeholder-slate-300"
                    placeholder="License # (optional)"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-xl font-bold" style={{ color: trade.textColor }}>
                    {doc.companyName || 'Your Business Name'}
                  </h1>
                  <p className="text-sm text-slate-500">
                    {[doc.companyPhone, doc.companyEmail, doc.companyLicense].filter(Boolean).join(' | ')}
                  </p>
                </div>
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{ backgroundColor: trade.primaryColor }}
                >
                  ESTIMATE
                </span>
              </div>
            )}
          </div>

          {/* ── Client Info ── */}
          <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Prepared For
            </p>
            {editMode ? (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <input
                  type="text"
                  value={doc.clientName}
                  onChange={(e) => updateDoc({ clientName: e.target.value })}
                  className="rounded border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
                  placeholder="Client Name"
                />
                <input
                  type="text"
                  value={doc.clientAddress}
                  onChange={(e) => updateDoc({ clientAddress: e.target.value })}
                  className="rounded border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
                  placeholder="Job Address"
                />
                <input
                  type="text"
                  value={doc.clientPhone}
                  onChange={(e) => updateDoc({ clientPhone: e.target.value })}
                  className="rounded border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
                  placeholder="Client Phone"
                />
                <input
                  type="date"
                  value={doc.projectDate}
                  onChange={(e) => updateDoc({ projectDate: e.target.value })}
                  className="rounded border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
                />
              </div>
            ) : (
              <div>
                <p className="font-semibold text-slate-800">{doc.clientName || '—'}</p>
                {doc.clientAddress && <p className="text-sm text-slate-500">{doc.clientAddress}</p>}
                <p className="text-sm text-slate-500">
                  {[doc.clientPhone].filter(Boolean).join(' | ')}
                </p>
                <p className="mt-1 text-xs text-slate-400">Date: {doc.projectDate}</p>
              </div>
            )}
          </div>

          {/* ── Scope of Work ── */}
          <div className="mb-6">
            <h2 className="mb-2 text-lg font-bold" style={{ color: trade.textColor }}>
              Scope of Work
            </h2>
            {editMode ? (
              <textarea
                value={doc.scopeOfWork}
                onChange={(e) => updateDoc({ scopeOfWork: e.target.value })}
                className="w-full rounded border border-slate-200 p-3 text-sm leading-relaxed text-slate-700 outline-none focus:border-slate-400"
                rows={4}
                placeholder={'Describe the work to be done...\ne.g. "Mow front and back yard, edge sidewalks, blow off driveway. Trim hedges along fence line."'}
              />
            ) : doc.scopeOfWork ? (
              <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
                {doc.scopeOfWork}
              </p>
            ) : (
              <p className="text-sm italic text-slate-400">No scope of work entered.</p>
            )}
          </div>

          {/* ── Estimate Table ── */}
          <div className="mb-6">
            <EstimateTable />
          </div>

          {/* ── Terms & Conditions ── */}
          <div className="mb-4">
            {editMode && (
              <label className="no-print mb-2 flex items-center gap-2 text-sm text-slate-500">
                <input
                  type="checkbox"
                  checked={doc.showTerms}
                  onChange={(e) => updateDoc({ showTerms: e.target.checked })}
                  className="rounded"
                />
                Include Terms & Conditions
              </label>
            )}
            {doc.showTerms && (
              <div>
                <h2 className="mb-2 text-lg font-bold" style={{ color: trade.textColor }}>
                  Terms & Conditions
                </h2>
                {editMode ? (
                  <textarea
                    value={doc.terms}
                    onChange={(e) => updateDoc({ terms: e.target.value })}
                    className="w-full rounded border border-slate-200 p-3 text-sm leading-relaxed text-slate-600 outline-none focus:border-slate-400"
                    rows={6}
                  />
                ) : (
                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-xs leading-relaxed text-slate-500 whitespace-pre-line">
                    {doc.terms}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Signature Line ── */}
          <SignatureLine />

          {/* ── Footer ── */}
          <div className="mt-6 border-t border-slate-100 pt-3 text-center">
            <p className="text-xs text-slate-400">
              {doc.companyName}{doc.companyPhone ? ` | ${doc.companyPhone}` : ''}{doc.companyEmail ? ` | ${doc.companyEmail}` : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <ActionBar />

      {/* Field Sheet Modal */}
      {showFieldSheet && <FieldSheet />}
    </div>
  )
}

export default App
