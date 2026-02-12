import { useDocument } from './context/DocumentContext.jsx'
import Canvas from './components/Canvas.jsx'
import Sidebar from './components/Sidebar.jsx'
import FieldSheet from './components/FieldSheet.jsx'

function App() {
  const { showFieldSheet } = useDocument()

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100 font-sans">
      <Sidebar />
      <Canvas />
      {showFieldSheet && <FieldSheet />}
    </div>
  )
}

export default App
