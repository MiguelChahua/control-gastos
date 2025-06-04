import Gasto from "./Gasto"

let listaGastos = [
    {nombre: 'Alquiler', monto: 500},
    {nombre: 'Comida', monto: 300},
    {nombre: 'Luz', monto: 50},
    {nombre: 'Agua', monto: 50},
    {nombre: 'Internet', monto: 90},
    {nombre: 'Transporte', monto: 150}
]

function ListadoGastos() {
  return (
    <div className="flex">
      <h2 className="titulo-gastos text-center">Gastos Mensuales</h2>
      <div className="bg-white rounded-3 shadow-lg p-4" style={{width: '300px'}}>
        
        <div className="d-flex flex-column gap-3">
          {listaGastos.map((g, i) => (
            <Gasto nombre={g.nombre} valor={g.monto} key={i} />
          ))}
        </div>
        <div className="d-flex justify-content-center mt-4">
          <button className="btn btn-primary">Agregar gasto</button>
        </div>
      </div>
    </div>
  )
}
export default ListadoGastos