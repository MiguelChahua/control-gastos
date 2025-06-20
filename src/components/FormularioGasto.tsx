import { useEffect, useState } from "react";
import type { GastoType } from "./Gasto";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";

export type FormType = {
  onAgregar: (gasto: GastoType) => void;
  onEditar?: (index: number, gasto: GastoType) => void;
  gastos?: GastoType[]
  totalGastos?: number
};

const FormularioGasto = ({ onEditar, onAgregar, gastos = [], totalGastos = 0 }: FormType) => {
  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const esEdicion = id!== undefined

  useEffect(() => {
    if (esEdicion && gastos.length > 0) {
      const index = parseInt(id!);
      const gasto = gastos[index];
      if (gasto) {
        setNombre(gasto.nombre);
        setMonto(gasto.monto.toString());
      }
    }
  }, [id, gastos]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar nombre: solo letras y espacios
    const soloLetrasRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!soloLetrasRegex.test(nombre.trim())) {
      toast.error("El nombre del gasto solo debe contener letras.");
      return;
    }

    // Validar monto: debe ser número y mayor a 0
    const montoNumero = parseFloat(monto);
    if (isNaN(montoNumero) || montoNumero <= 0) {
      toast.error("El monto debe ser un número válido y mayor que 0.");
      return;
    }

    // Validar si se supera el presupuesto
    const ingresoMaximo = localStorage.getItem('ingresos');
    const ingresos = ingresoMaximo ? Number(ingresoMaximo) : 1200;

    let totalAValidar = totalGastos;

    // Si es edición, restamos el gasto original del total
    if (esEdicion && id !== undefined) {
      const index = parseInt(id);
      const gastoOriginal = gastos[index];
      if (gastoOriginal) {
        totalAValidar -= gastoOriginal.monto;
      }
    }

    if (totalAValidar + montoNumero > ingresos) {
      toast.error("Has alcanzado tu presupuesto mensual.");
      return;
    }


    const nuevoGasto: GastoType = {
      nombre,
      monto: parseFloat(monto)
    };

    onAgregar(nuevoGasto);

    if (esEdicion && onEditar) {
      onEditar(parseInt(id!), nuevoGasto);
      toast.success("Gasto editado con éxito");
    }
    else {
      onAgregar(nuevoGasto);
      toast.success("Gasto agregado con éxito");
      setNombre('');
      setMonto('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5 p-4 bg-white rounded shadow-sm mx-auto w-100" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">{esEdicion ? 'Editar Gasto' : 'Agregar Gasto'}</h2>

      <div className="row mb-3 align-items-center">
        <label className="col-12 col-sm-4 col-form-label">Nombre del gasto</label>
        <div className="col-12 col-sm-8">
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
        <label className="col-12 col-sm-4 col-form-label">Monto</label>
        <div className="col-12 col-sm-8">
          <input
            type="text"
            className="form-control"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="text-center">
        <button type="submit" className="btn btn-primary px-4 me-2">
          {esEdicion ? 'Actualizar' : 'Agregar'}
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
