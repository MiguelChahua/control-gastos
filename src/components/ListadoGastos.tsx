import { Link, useNavigate } from 'react-router-dom'
import Gasto from "./Gasto"
import type { GastoType } from './Gasto';
import Resumen from './Resumen';

export type ListProps = {
  gastos: GastoType[]
  onEliminar: (index:number) => void
}

const ListadoGastos = ( {gastos, onEliminar} : ListProps) => {

  const total = gastos.reduce((acc, gasto) => acc + gasto.monto, 0);
  const navigate = useNavigate()

  return (
    <div className="container mt-5">
      <div className="row justify-content-center gy-4">
        <div className="col-12 col-md-5 order-1 order-md-0">
          {/* Caja izquierda: Resumen */}
          <Resumen totalGastos={total} />
        </div>
        <div className="col-12 col-md-5">
          <h2 className="titulo-gastos text-center">Gastos Mensuales</h2>
          <div className="mx-auto bg-white rounded-3 shadow-lg p-4 w-100" style={{ maxWidth: '400px' }}>
            <div className="d-flex flex-column gap-3">
              {gastos.length == 0 ? (
                <div className="text-center text-muted gap-3">Agrega tus gastos del mes para empezar
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  width={18}
                  height={18}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                </div>

              ) : (
                gastos.map((g, i) => (
                <Gasto
                  key={i}
                  nombre={g.nombre}
                  monto={g.monto}
                  onEliminar={() => onEliminar(i)}
                  onEditar={() => navigate(`/editar/${i}`)}
                />
                ))
              )}
            </div>
            
            {/* Botón para nuevo gasto */}
            <Link to="/nuevo" className="d-flex justify-content-center mt-4">
              <button className="btn btn-primary">Nuevo gasto</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ListadoGastos