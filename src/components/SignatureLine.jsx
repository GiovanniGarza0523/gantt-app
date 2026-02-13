import { useDocument } from '../context/DocumentContext.jsx'

export default function SignatureLine() {
  const { trade } = useDocument()

  return (
    <div className="mt-8 pt-4">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <div className="mb-1 border-b-2 border-slate-300" style={{ height: '40px' }} />
          <p className="text-xs text-slate-500">Client Signature</p>
        </div>
        <div>
          <div className="mb-1 border-b-2 border-slate-300" style={{ height: '40px' }} />
          <p className="text-xs text-slate-500">Date</p>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-slate-400">
        By signing above, you authorize the work described in this estimate.
      </p>
    </div>
  )
}
