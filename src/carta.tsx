// Carta.tsx


interface CartaProps {
  titulo: string;
  descripcion: string;
  imagen:string;
  onDelete?: () => void;
}

function Carta({ titulo, descripcion,imagen, onDelete }: CartaProps) {
  return (
    <div className="card" style={{ width: "18rem", margin: "1rem" }}>
      <img src={imagen} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} alt={titulo} />
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text">{descripcion}</p>
        <button className="btn btn-danger" onClick={onDelete}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default Carta;
