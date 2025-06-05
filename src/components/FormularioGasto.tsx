import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import type { GastoType } from "./Gasto"

export type FormType = {
  onAgregar: ( gasto : GastoType ) => void
}

const FormularioGasto = ({onAgregar} : FormType) => {
  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');
  const navigate = useNavigate();

  const handleSubmit = ( e : React.FormEvent) => {
    e.preventDefault() // Evita que se ejecute por defecto
    const nuevoGasto : GastoType = {
      nombre,
      monto: parseFloat(monto)
    }
    onAgregar(nuevoGasto)
    navigate('/')

  }

  return (
    <form onSubmit={handleSubmit} className="container mt-5 p-4 bg-white rounded shadow-sm" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Agregar Gasto</h2>

      {/* Campo: Nombre del gasto */}
      <div className="row mb-3 align-items-center">
        <label className="col-sm-4 col-form-label">Nombre del gasto</label>
        <div className="col-sm-8">
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Campo: Monto */}
      <div className="row mb-4 align-items-center">
        <label className="col-sm-4 col-form-label">Monto</label>
        <div className="col-sm-8">
          <input
            type="number"
            className="form-control"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Botón */}
      <div className="text-center">
        <button type="submit" className="btn btn-success px-4">
          ➕ Agregar
        </button>
      </div>
    </form>

  )
}

export default FormularioGasto
