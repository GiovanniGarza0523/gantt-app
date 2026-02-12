import { useDocument } from '../../context/DocumentContext.jsx'
import { TEMPLATES } from '../../data/mockData.js'

export default function TeamBlock({ block }) {
  const { doc, editMode, updateBlock } = useDocument()
  const theme = TEMPLATES[doc.template]
  const { heading, members } = block.data

  const updateMember = (index, field, value) => {
    const updated = members.map((m, i) =>
      i === index ? { ...m, [field]: value } : m
    )
    updateBlock(block.id, { members: updated })
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
      <div className="flex justify-center gap-8">
        {members.map((member, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <img
              src={member.avatar}
              alt={member.name}
              className="mb-3 h-20 w-20 rounded-full object-cover border-2"
              style={{ borderColor: theme.primaryColor }}
              crossOrigin="anonymous"
            />
            {editMode ? (
              <>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => updateMember(i, 'name', e.target.value)}
                  className="touch-input w-32 text-center font-semibold text-slate-800 outline-none border-b border-transparent focus:border-slate-300"
                />
                <input
                  type="text"
                  value={member.role}
                  onChange={(e) => updateMember(i, 'role', e.target.value)}
                  className="w-32 text-center text-sm text-slate-500 outline-none border-b border-transparent focus:border-slate-200"
                />
              </>
            ) : (
              <>
                <p className="font-semibold text-slate-800">{member.name}</p>
                <p className="text-sm text-slate-500">{member.role}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
