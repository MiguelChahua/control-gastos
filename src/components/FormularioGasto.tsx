import { useState } from "react";
import type { GastoType } from "./Gasto";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export type FormType = {
  onAgregar: (gasto: GastoType) => void;
};

const FormularioGasto = ({ onAgregar }: FormType) => {
  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nuevoGasto: GastoType = {
      nombre,
      monto: parseFloat(monto)
    };

    onAgregar(nuevoGasto);
    toast.success("✅ Gasto agregado con éxito");

    setNombre('');
    setMonto('');
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5 p-4 bg-white rounded shadow-sm" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Agregar Gasto</h2>

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

      <div className="text-center">
        <button type="submit" className="btn btn-primary px-4 me-2">
          Agregar
        </button>
        <button 
          type="button"
          className="btn btn-outline-dark"
          onClick={() => navigate ("/")}
        >
          Volver al listado
        </button>
      </div>
    </form>
  );
};

export default FormularioGasto;
