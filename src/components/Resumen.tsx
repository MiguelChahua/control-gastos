import { useState } from 'react';

type ResumenProps = {
  totalGastos: number;
};

const Resumen = ({ totalGastos }: ResumenProps) => {
  const [ingresos, setIngresos] = useState<number>(0);
  const saldo = ingresos - totalGastos;

  return (
    <div className="d-flex flex-column align-items-center">
      {/* Título */}
      <h2 className="titulo-gastos text-center mb-4">Resumen Financiero</h2>

      {/* Caja blanca */}
      <div className="bg-white rounded-3 shadow-lg p-4" style={{ width: '400px' }}>
        {/* Input ingresos - misma línea, mismo estilo */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <label className="fw-semibold text-dark fs-5 mb-0" htmlFor="ingresos">
            Ingresos del mes
          </label>
          <input
            type="text"
            id="ingresos"
            className="form-control"
            value={ingresos}
            onChange={(e) => {
              const valor = e.target.value;
              const numero = Number(valor);
              if (!isNaN(numero)) {
                setIngresos(numero);
              } else if (valor === '') {
                setIngresos(0);
              }
            }}
            style={{ width: '100px' }}
            placeholder="Ej. 1500"
          />
        </div>

        {/* Línea separadora y total gastos */}
        <div className="d-flex justify-content-between border-top pt-3 fw-bold fs-5">
          <div className="fw-semibold text-dark">Gastos Mensuales</div>
          <span className="text-success d-flex align-items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              width={18}
              height={18}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            {totalGastos.toFixed(2)}
          </span>
        </div>

        {/* Saldo */}
        <div className="d-flex justify-content-between mt-3 border-top pt-3 fw-bold fs-5">
          <div className="fw-semibold text-dark">Saldo</div>
          <span className={saldo >= 0 ? 'text-success' : 'text-danger'}>
            S/. {saldo.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Resumen;

