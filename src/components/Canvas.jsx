import { useRef, useState, useEffect, useCallback } from 'react'
import { DndContext, closestCenter, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { useDocument } from '../context/DocumentContext.jsx'
import { TEMPLATES } from '../data/mockData.js'
import SortableBlock from './SortableBlock.jsx'

export default function Canvas() {
  const { doc, editMode, reorderBlocks, updateDoc } = useDocument()
  const theme = TEMPLATES[doc.template]
  const pageRef = useRef(null)
  const containerRef = useRef(null)
  const [scale, setScale] = useState(1)

  const calculateScale = useCallback(() => {
    if (!containerRef.current) return
    const containerWidth = containerRef.current.clientWidth
    const pageWidthPx = 793.7 // 210mm in px at 96dpi
    const padding = 32
    const availableWidth = containerWidth - padding
    const newScale = Math.min(1, availableWidth / pageWidthPx)
    setScale(newScale)
  }, [])

  useEffect(() => {
    calculateScale()
    window.addEventListener('resize', calculateScale)
    return () => window.removeEventListener('resize', calculateScale)
  }, [calculateScale])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = doc.blocks.findIndex((b) => b.id === active.id)
      const newIndex = doc.blocks.findIndex((b) => b.id === over.id)
      reorderBlocks(arrayMove(doc.blocks, oldIndex, newIndex))
    }
  }

  return (
    <div ref={containerRef} className="flex-1 overflow-auto p-4" style={{ backgroundColor: theme.bgColor }}>
      <div
        className="mx-auto origin-top"
        style={{ transform: `scale(${scale})`, width: '210mm' }}
      >
        <div ref={pageRef} id="pdf-target" className="a4-page rounded-lg p-8 pl-16">
          {/* Company Header */}
          <div className="mb-6 flex items-center justify-between border-b pb-4" style={{ borderColor: `${theme.primaryColor}30` }}>
            <div>
              <h2 className="text-xl font-bold" style={{ color: theme.textColor }}>
                {doc.companyName}
              </h2>
              <p className="text-sm text-slate-500">{doc.companyTagline}</p>
            </div>
            <div className="text-right text-sm text-slate-500">
              <p>{doc.companyPhone}</p>
              <p>{doc.companyEmail}</p>
            </div>
          </div>

          {/* Client Info */}
          {(doc.clientName || editMode) && (
            <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Prepared For
              </p>
              <p className="font-semibold text-slate-800">
                {doc.clientName || (editMode ? '' : 'Client Name')}
              </p>
              {doc.clientAddress && (
                <p className="text-sm text-slate-500">{doc.clientAddress}</p>
              )}
              <p className="text-sm text-slate-500">
                {[doc.clientPhone, doc.clientEmail].filter(Boolean).join(' | ')}
              </p>
              <p className="mt-1 text-xs text-slate-400">Date: {doc.projectDate}</p>
            </div>
          )}

          {/* Blocks */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={doc.blocks.map((b) => b.id)}
              strategy={verticalListSortingStrategy}
            >
              {doc.blocks.map((block) => (
                <SortableBlock key={block.id} block={block} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  )
}
