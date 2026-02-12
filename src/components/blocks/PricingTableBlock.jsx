import { useDocument } from '../../context/DocumentContext.jsx'
import { TEMPLATES } from '../../data/mockData.js'
import { Plus, Trash2 } from 'lucide-react'

export default function PricingTableBlock({ block }) {
  const { doc, editMode, updateBlock } = useDocument()
  const theme = TEMPLATES[doc.template]
  const { heading, items, taxRate, notes } = block.data

  const subtotal = items.reduce((sum, item) => sum + item.qty * item.unitCost, 0)
  const tax = subtotal * (taxRate / 100)
  const total = subtotal + tax

  const updateItem = (index, field, value) => {
    const updated = items.map((item, i) =>
      i === index ? { ...item, [field]: field === 'description' ? value : Number(value) || 0 } : item
    )
    updateBlock(block.id, { items: updated })
  }

  const addItem = () => {
    updateBlock(block.id, {
      items: [...items, { qty: 1, description: 'New Item', unitCost: 0 }],
    })
  }

  const removeItem = (index) => {
    updateBlock(block.id, { items: items.filter((_, i) => i !== index) })
  }

  const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

  return (
    <div className="py-6">
      {editMode ? (
        <input
          type="text"
          value={heading}
          onChange={(e) => updateBlock(block.id, { heading: e.target.value })}
          className="touch-input mb-4 w-full text-2xl font-bold outline-none border-b-2 border-transparent focus:border-slate-300"
          style={{ color: theme.textColor }}
        />
      ) : (
        <h2 className="mb-4 text-2xl font-bold" style={{ color: theme.textColor }}>
          {heading}
        </h2>
      )}

      <div className="overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full text-left">
          <thead>
            <tr style={{ backgroundColor: theme.primaryColor }}>
              <th className="px-4 py-3 text-sm font-semibold text-white w-16">Qty</th>
              <th className="px-4 py-3 text-sm font-semibold text-white">Description</th>
              <th className="px-4 py-3 text-sm font-semibold text-white text-right w-28">Unit Cost</th>
              <th className="px-4 py-3 text-sm font-semibold text-white text-right w-28">Total</th>
              {editMode && <th className="w-10" />}
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="border-t border-slate-100 even:bg-slate-50">
                <td className="px-4 py-3">
                  {editMode ? (
                    <input
                      type="number"
                      inputMode="numeric"
                      value={item.qty}
                      onChange={(e) => updateItem(i, 'qty', e.target.value)}
                      className="touch-input w-16 rounded border border-slate-200 px-2 text-center outline-none focus:border-slate-400"
                    />
                  ) : (
                    <span className="text-slate-700">{item.qty}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {editMode ? (
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(i, 'description', e.target.value)}
                      className="touch-input w-full outline-none border-b border-transparent focus:border-slate-300"
                    />
                  ) : (
                    <span className="text-slate-700">{item.description}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  {editMode ? (
                    <input
                      type="number"
                      inputMode="decimal"
                      value={item.unitCost}
                      onChange={(e) => updateItem(i, 'unitCost', e.target.value)}
                      className="touch-input w-24 rounded border border-slate-200 px-2 text-right outline-none focus:border-slate-400"
                    />
                  ) : (
                    <span className="text-slate-700">{fmt(item.unitCost)}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right font-medium text-slate-800">
                  {fmt(item.qty * item.unitCost)}
                </td>
                {editMode && (
                  <td className="px-2">
                    <button
                      onClick={() => removeItem(i)}
                      className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {editMode && (
          <button
            onClick={addItem}
            className="flex w-full items-center justify-center gap-2 border-t border-slate-200 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50"
          >
            <Plus size={16} /> Add Line Item
          </button>
        )}

        <div className="border-t border-slate-200 bg-slate-50 px-4 py-3">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Subtotal</span>
            <span>{fmt(subtotal)}</span>
          </div>
          {editMode ? (
            <div className="mt-1 flex items-center justify-between text-sm text-slate-600">
              <span className="flex items-center gap-2">
                Tax
                <input
                  type="number"
                  inputMode="decimal"
                  value={taxRate}
                  onChange={(e) => updateBlock(block.id, { taxRate: Number(e.target.value) || 0 })}
                  className="w-16 rounded border border-slate-200 px-2 py-1 text-center text-sm outline-none focus:border-slate-400"
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
            className="mt-2 flex justify-between border-t border-slate-300 pt-2 text-lg font-bold"
            style={{ color: theme.textColor }}
          >
            <span>Total</span>
            <span>{fmt(total)}</span>
          </div>
        </div>
      </div>

      {editMode ? (
        <textarea
          value={notes}
          onChange={(e) => updateBlock(block.id, { notes: e.target.value })}
          className="mt-3 w-full rounded border border-slate-200 p-3 text-sm text-slate-500 outline-none focus:border-slate-400"
          rows={2}
          placeholder="Additional notes..."
        />
      ) : notes ? (
        <p className="mt-3 text-sm italic text-slate-500">{notes}</p>
      ) : null}
    </div>
  )
}
