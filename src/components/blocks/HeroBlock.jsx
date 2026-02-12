import { useDocument } from '../../context/DocumentContext.jsx'
import { TEMPLATES } from '../../data/mockData.js'

export default function HeroBlock({ block }) {
  const { doc, editMode, updateBlock } = useDocument()
  const theme = TEMPLATES[doc.template]
  const { title, subtitle, backgroundImage } = block.data

  return (
    <div
      className="relative overflow-hidden rounded-lg"
      style={{ minHeight: '280px' }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center text-white" style={{ minHeight: '280px' }}>
        {editMode ? (
          <>
            <input
              type="text"
              value={title}
              onChange={(e) => updateBlock(block.id, { title: e.target.value })}
              className="touch-input mb-4 w-full max-w-lg bg-transparent text-center text-3xl font-bold text-white placeholder-white/60 outline-none border-b-2 border-white/30 focus:border-white"
              placeholder="Proposal Title"
            />
            <input
              type="text"
              value={subtitle}
              onChange={(e) => updateBlock(block.id, { subtitle: e.target.value })}
              className="touch-input w-full max-w-md bg-transparent text-center text-lg text-white/90 placeholder-white/50 outline-none border-b border-white/20 focus:border-white/60"
              placeholder="Subtitle"
            />
          </>
        ) : (
          <>
            <h1 className="mb-4 text-3xl font-bold">{title}</h1>
            <p className="text-lg text-white/90">{subtitle}</p>
          </>
        )}
        <div className="mt-6 flex items-center gap-2">
          <div
            className="h-1 w-12 rounded"
            style={{ backgroundColor: theme.primaryColor }}
          />
          <span className="text-sm font-medium text-white/70">
            {doc.companyName}
          </span>
          <div
            className="h-1 w-12 rounded"
            style={{ backgroundColor: theme.primaryColor }}
          />
        </div>
      </div>
    </div>
  )
}
