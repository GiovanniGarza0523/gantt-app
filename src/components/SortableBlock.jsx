import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Eye, EyeOff } from 'lucide-react'
import { useDocument } from '../context/DocumentContext.jsx'
import BlockRenderer from './BlockRenderer.jsx'

export default function SortableBlock({ block }) {
  const { editMode, toggleBlockVisibility } = useDocument()
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  if (!block.visible && !editMode) return null

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative ${isDragging ? 'block-editable is-dragging' : ''} ${
        !block.visible ? 'opacity-40' : ''
      }`}
    >
      {editMode && (
        <div className="absolute -left-10 top-2 z-20 flex flex-col gap-1">
          <button
            className="drag-handle rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            {...attributes}
            {...listeners}
          >
            <GripVertical size={18} />
          </button>
          <button
            onClick={() => toggleBlockVisibility(block.id)}
            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            {block.visible ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>
      )}
      <div className={editMode ? 'block-editable rounded-lg' : ''}>
        <BlockRenderer block={block} />
      </div>
    </div>
  )
}
