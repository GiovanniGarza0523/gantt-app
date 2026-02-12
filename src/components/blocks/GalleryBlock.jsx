import { useDocument } from '../../context/DocumentContext.jsx'
import { TEMPLATES } from '../../data/mockData.js'

export default function GalleryBlock({ block }) {
  const { doc, editMode, updateBlock } = useDocument()
  const theme = TEMPLATES[doc.template]
  const { heading, images } = block.data

  const updateImage = (index, value) => {
    const updated = images.map((img, i) => (i === index ? value : img))
    updateBlock(block.id, { images: updated })
  }

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
      <div className="grid grid-cols-3 gap-3">
        {images.map((src, i) => (
          <div key={i} className="relative">
            <img
              src={src}
              alt={`Project ${i + 1}`}
              className="h-40 w-full rounded-lg object-cover"
              crossOrigin="anonymous"
            />
            {editMode && (
              <input
                type="text"
                value={src}
                onChange={(e) => updateImage(i, e.target.value)}
                className="mt-1 w-full rounded border border-slate-200 px-2 py-1 text-xs text-slate-500 outline-none focus:border-slate-400"
                placeholder="Image URL"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
