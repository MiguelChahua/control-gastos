import { Link } from 'react-router-dom'
import Gasto from "./Gasto"
import type { GastoType } from './Gasto';
import Resumen from './Resumen';

export type ListProps = {
  gastos: GastoType[]
}

const ListadoGastos = ( {gastos} : ListProps) => {

  const total = gastos.reduce((acc, gasto) => acc + gasto.monto, 0);

  return (
    <div className="d-flex gap-4 justify-content-center align-items-center mt-5">
      {/* Caja izquierda: Resumen */}
      <Resumen totalGastos={total} />
      <div className="flex">
        <h2 className="titulo-gastos text-center">Gastos Mensuales</h2>
        <div className="bg-white rounded-3 shadow-lg p-4" style={{width: '300px'}}>
          
          <div className="d-flex flex-column gap-3">
            {gastos.map((g, i) => (
              <Gasto nombre={g.nombre} monto={g.monto} key={i} />
            ))}
          </div>
          
          {/* Botón para nuevo gasto */}
          <Link to="/nuevo" className="d-flex justify-content-center mt-4">
            <button className="btn btn-primary">➕ Nuevo gasto</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default ListadoGastos