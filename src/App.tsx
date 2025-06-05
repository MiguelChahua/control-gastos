import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import type { GastoType } from './components/Gasto';
import './App.css'
import ListadoGastos from './components/ListadoGastos'
import FormularioGasto from './components/FormularioGasto';

function App() {

  const [gastos, setGastos] = useState<GastoType[]>([
    { nombre: 'Alquiler', monto: 500 },
    { nombre: 'Comida', monto: 300 },
    { nombre: 'Luz', monto: 50 },
    { nombre: 'Agua', monto: 50 },
    { nombre: 'Internet', monto: 90 },
    { nombre: 'Transporte', monto: 150 }
  ])

  const agregarGasto = (nuevo : GastoType) => {
    setGastos([...gastos, nuevo])
  }

  return (
    // <div className="min-vh-100 bg d-flex justify-content-center align-items-center">
    //   <ListadoGastos />
    // </div>

    <Router>
      <div className="min-vh-100 bg d-flex justify-content-center align-items-center">
        <Routes>
          <Route path="/" element={<ListadoGastos gastos={gastos} />} />
          <Route path="/nuevo" element={<FormularioGasto onAgregar={agregarGasto} />} />
        </Routes>
      </div>
    </Router>

  )
}

export default App