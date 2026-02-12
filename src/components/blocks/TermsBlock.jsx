import { useDocument } from '../../context/DocumentContext.jsx'
import { TEMPLATES } from '../../data/mockData.js'

export default function TermsBlock({ block }) {
  const { doc, editMode, updateBlock } = useDocument()
  const theme = TEMPLATES[doc.template]
  const { heading, content } = block.data

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
      {editMode ? (
        <textarea
          value={content}
          onChange={(e) => updateBlock(block.id, { content: e.target.value })}
          className="w-full rounded border border-slate-200 p-4 text-sm leading-relaxed text-slate-600 outline-none focus:border-slate-400"
          rows={12}
        />
      ) : (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-600 whitespace-pre-line">
          {content}
        </div>
      )}
    </div>
  )
}
