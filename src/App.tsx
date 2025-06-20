import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { GastoType } from './components/Gasto';
import './App.css'
import ListadoGastos from './components/ListadoGastos'
import FormularioGasto from './components/FormularioGasto';
import { ToastContainer } from 'react-toastify';

function App() {

  const [gastos, setGastos] = useState<GastoType[]>(() => {
    const guardados = localStorage.getItem('gastos');
    return guardados ? JSON.parse(guardados) : [];
  })

  useEffect(() => {
  localStorage.setItem('gastos', JSON.stringify(gastos));
  }, [gastos]);

  const agregarGasto = (nuevo : GastoType) => {
    setGastos([...gastos, nuevo])
  }

  const eliminarGasto = (index: number) => {
    const nuevosGastos = gastos.filter((_, i) => i !== index);
    setGastos(nuevosGastos);
  }

  const editarGasto = (index: number, gastoActualizado: GastoType) => {
  setGastos((prevGastos) => {
    const nuevos = [...prevGastos];
    nuevos[index] = gastoActualizado;
    return nuevos;
    });
  }

  const totalGastos = gastos.reduce((acc,g) => acc + g.monto,0)

  return (
    <Router>
      <div className="min-vh-100 bg d-flex justify-content-center align-items-start p-5">
        <Routes>
          <Route path="/" element={<ListadoGastos gastos={gastos} onEliminar={eliminarGasto}/>} />
          <Route path="/nuevo" element={<FormularioGasto onAgregar={agregarGasto} gastos={gastos} totalGastos={totalGastos}/>} />
          <Route path="/editar/:id" element={<FormularioGasto onAgregar={() => {}} gastos={gastos} onEditar={editarGasto} totalGastos={totalGastos}/>} />
        </Routes>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  )
}

export default App