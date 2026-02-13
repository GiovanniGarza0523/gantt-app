import { Plus, Trash2 } from 'lucide-react'
import { useDocument } from '../context/DocumentContext.jsx'

export default function EstimateTable() {
  const { doc, trade, editMode, addLineItem, updateLineItem, removeLineItem, updateDoc } = useDocument()
  const { lineItems, taxRate, notes } = doc

  const subtotal = lineItems.reduce((sum, item) => sum + item.qty * item.unitCost, 0)
  const tax = subtotal * (taxRate / 100)
  const total = subtotal + tax

  const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

  return (
    <div>
      <h2 className="mb-3 text-lg font-bold" style={{ color: trade.textColor }}>
        Estimate
      </h2>

      <div className="overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead>
            <tr style={{ backgroundColor: trade.primaryColor }}>
              <th className="px-3 py-2.5 font-semibold text-white w-14">Qty</th>
              <th className="px-3 py-2.5 font-semibold text-white">Description</th>
              <th className="px-3 py-2.5 font-semibold text-white text-right w-24">Rate</th>
              <th className="px-3 py-2.5 font-semibold text-white text-right w-24">Amount</th>
              {editMode && <th className="w-8" />}
            </tr>
          </thead>
          <tbody>
            {lineItems.map((item, i) => (
              <tr key={i} className="border-t border-slate-100 even:bg-slate-50">
                <td className="px-3 py-2">
                  {editMode ? (
                    <input
                      type="number"
                      inputMode="numeric"
                      value={item.qty}
                      onChange={(e) => updateLineItem(i, 'qty', e.target.value)}
                      className="w-14 rounded border border-slate-200 px-2 py-1.5 text-center text-sm outline-none focus:border-slate-400"
                    />
                  ) : (
                    <span className="text-slate-700">{item.qty}</span>
                  )}
                </td>
                <td className="px-3 py-2">
                  {editMode ? (
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateLineItem(i, 'description', e.target.value)}
                      className="w-full py-1.5 text-sm outline-none border-b border-transparent focus:border-slate-300"
                      placeholder="What are you charging for?"
                    />
                  ) : (
                    <span className="text-slate-700">{item.description}</span>
                  )}
                </td>
                <td className="px-3 py-2 text-right">
                  {editMode ? (
                    <input
                      type="number"
                      inputMode="decimal"
                      value={item.unitCost}
                      onChange={(e) => updateLineItem(i, 'unitCost', e.target.value)}
                      className="w-20 rounded border border-slate-200 px-2 py-1.5 text-right text-sm outline-none focus:border-slate-400"
                    />
                  ) : (
                    <span className="text-slate-700">{fmt(item.unitCost)}</span>
                  )}
                </td>
                <td className="px-3 py-2 text-right font-medium text-slate-800">
                  {fmt(item.qty * item.unitCost)}
                </td>
                {editMode && (
                  <td className="px-1">
                    <button
                      onClick={() => removeLineItem(i)}
                      className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {editMode && (
          <button
            onClick={addLineItem}
            className="flex w-full items-center justify-center gap-1.5 border-t border-slate-200 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-50"
          >
            <Plus size={14} /> Add Line Item
          </button>
        )}

        <div className="border-t border-slate-200 bg-slate-50 px-3 py-2.5">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Subtotal</span>
            <span>{fmt(subtotal)}</span>
          </div>
          {editMode ? (
            <div className="mt-1 flex items-center justify-between text-sm text-slate-600">
              <span className="flex items-center gap-1.5">
                Tax
                <input
                  type="number"
                  inputMode="decimal"
                  value={taxRate}
                  onChange={(e) => updateDoc({ taxRate: Number(e.target.value) || 0 })}
                  className="w-14 rounded border border-slate-200 px-2 py-1 text-center text-sm outline-none focus:border-slate-400"
                />
                %
              </span>
              <span>{fmt(tax)}</span>
            </div>
          ) : taxRate > 0 ? (
            <div className="mt-1 flex justify-between text-sm text-slate-600">
              <span>Tax ({taxRate}%)</span>
              <span>{fmt(tax)}</span>
            </div>
          ) : null}
          <div
            className="mt-2 flex justify-between border-t border-slate-300 pt-2 text-base font-bold"
            style={{ color: trade.textColor }}
          >
            <span>Total</span>
            <span>{fmt(total)}</span>
          </div>
        </div>
      </div>

      {editMode ? (
        <textarea
          value={notes}
          onChange={(e) => updateDoc({ notes: e.target.value })}
          className="mt-2 w-full rounded border border-slate-200 p-2.5 text-sm text-slate-500 outline-none focus:border-slate-400"
          rows={2}
          placeholder="Notes (e.g. payment terms, estimate validity)..."
        />
      ) : notes ? (
        <p className="mt-2 text-xs italic text-slate-500">{notes}</p>
      ) : null}
    </div>
  )
}
