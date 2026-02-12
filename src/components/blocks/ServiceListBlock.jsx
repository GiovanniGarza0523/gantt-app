import * as LucideIcons from 'lucide-react'
import { useDocument } from '../../context/DocumentContext.jsx'
import { TEMPLATES } from '../../data/mockData.js'

export default function ServiceListBlock({ block }) {
  const { doc, editMode, updateBlock } = useDocument()
  const theme = TEMPLATES[doc.template]
  const { heading, services } = block.data

  const updateService = (index, field, value) => {
    const updated = services.map((s, i) =>
      i === index ? { ...s, [field]: value } : s
    )
    updateBlock(block.id, { services: updated })
  }

  return (
    <div className="py-6">
      {editMode ? (
        <input
          type="text"
          value={heading}
          onChange={(e) => updateBlock(block.id, { heading: e.target.value })}
          className="touch-input mb-6 w-full text-2xl font-bold outline-none border-b-2 border-transparent focus:border-slate-300"
          style={{ color: theme.textColor }}
        />
      ) : (
        <h2 className="mb-6 text-2xl font-bold" style={{ color: theme.textColor }}>
          {heading}
        </h2>
      )}
      <div className="grid grid-cols-2 gap-4">
        {services.map((service, i) => {
          const Icon = LucideIcons[service.icon] || LucideIcons.Wrench
          return (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg border border-slate-200 p-4"
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${theme.primaryColor}15` }}
              >
                <Icon size={20} style={{ color: theme.primaryColor }} />
              </div>
              <div className="min-w-0 flex-1">
                {editMode ? (
                  <>
                    <input
                      type="text"
                      value={service.label}
                      onChange={(e) => updateService(i, 'label', e.target.value)}
                      className="touch-input w-full font-semibold text-slate-800 outline-none border-b border-transparent focus:border-slate-300"
                    />
                    <input
                      type="text"
                      value={service.description}
                      onChange={(e) => updateService(i, 'description', e.target.value)}
                      className="w-full text-sm text-slate-500 outline-none border-b border-transparent focus:border-slate-200"
                    />
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-slate-800">{service.label}</p>
                    <p className="text-sm text-slate-500">{service.description}</p>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
