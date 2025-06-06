export type GastoType = {
  nombre: string;
  monto: number;
};

function Gasto({ nombre, monto }: GastoType) {
  return (
    <div className="d-flex justify-content-between align-items-center py-3 px-2 bg-light rounded border">
      <div className="fw-semibold text-dark">{nombre}</div>
      <div className="d-flex align-items-center gap-1 text-success">
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
        <span className="fw-bold">{monto}</span>
      </div>
    </div>
  );
}

export default Gasto;