type Trabajo={
    titulo:string;
    imagenURL:string;
    descripcion:string;
}
export default function TrabajoCard({titulo,imagenURL,descripcion}:Trabajo){
    return(
        <div className="card" style={{ width: '18rem' }}>
            <img src={imagenURL} className="card-img-top" alt={titulo} />
            <div className="card-body">
                <h5 className="card-title">{titulo}</h5>
                <p className="card-text">{descripcion}</p>
            </div>
        </div>
    );
}