// App.tsx
import { useEffect, useState } from "react";
import { Incienso } from "./type";
import { db } from "./firebaseconfig";
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import Carta from "./carta";

function App() {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState<number>(1);
  const [inciensos, setInciensos] = useState<Incienso[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState("");

  const obtenerInciensos = async () => {
    const snapshot = await getDocs(collection(db, "inciensos"));
    const lista: Incienso[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      nombre: doc.data().nombre,
      cantidad: doc.data().cantidad,
      imagen: doc.data().imagen,
    }));
    setInciensos(lista);
  };

  useEffect(() => {
    obtenerInciensos();
  }, []);
  const imagenesDisponibles=[
    "7poderes.png",
    "d2.jfif",
    "descargar.jfif",
    "descargar.png",
    "navbar.jfif",
    "paloSanto.jfif",
  ];
  const agregarIncienso = async () => {
    if (!nombre.trim()) return;

    const nuevo = { nombre, cantidad , imagen:imagenSeleccionada };

    try {
      const docRef = await addDoc(collection(db, "inciensos"), nuevo);
      setInciensos([...inciensos, { ...nuevo, id: docRef.id }]);
      setNombre("");
      setCantidad(1);
      
    } catch (error) {
      console.error("Error al agregar incienso:", error);
    }
  };

  const eliminarIncienso = async (id: string) => {
    try {
      await deleteDoc(doc(db, "inciensos", id));
      setInciensos(inciensos.filter((i) => i.id !== id));
    } catch (error) {
      console.error("Error al eliminar incienso:", error);
    }
  };
  
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 20 }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Inventario de Inciensos</h1>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={() => setModalAbierto(true)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          + Agregar Incienso
        </button>
      </div>

      {/* Modal */}
      {modalAbierto && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
          }}
        >
          <div style={{
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "12px",
            width: "90%",
            maxWidth: "500px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
          }}>
            <h2 style={{ marginBottom: "20px" }}>Agregar nuevo incienso</h2>

            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre del incienso"
              style={{
                width: "100%",
                padding: "14px",
                marginBottom: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc"
              }}
            />
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              min={1}
              placeholder="Cantidad"
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc"
              }}
            />

            <div style={{ marginBottom: "10px" }}>
              <strong>Selecciona una imagen:</strong>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
                {imagenesDisponibles.map((img) => (
                  <img
                    key={img}
                    src={`/img/${img}`}
                    alt={img}
                    onClick={() => setImagenSeleccionada(img)}
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: "cover",
                      border: imagenSeleccionada === img ? "3px solid #007bff" : "1px solid gray",
                      cursor: "pointer",
                      borderRadius: 8,
                    }}
                  />
                ))}
              </div>
            </div>

            {imagenSeleccionada && (
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <img src={`/img/${imagenSeleccionada}`} alt="Preview" style={{ width: 100, borderRadius: 6 }} />
              </div>
            )}

            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={() => setModalAbierto(false)}
                style={{
                  padding: "10px 15px",
                  backgroundColor: "#ccc",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Cancelar
              </button>
              <button
                onClick={async()=>{
                  await agregarIncienso ();
                  setModalAbierto(false);
                  setImagenSeleccionada("");
                }}
                
                style={{
                  padding: "10px 15px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de inciensos */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
          padding:"20px",
          width:"100%"
          
        }}
      >
        {inciensos.map((i) => (
          <Carta
            key={i.id}
            titulo={i.nombre}
            imagen={`/img/${i.imagen}`}
            descripcion={`Cantidad: ${i.cantidad}`}
            onDelete={() => eliminarIncienso(i.id)}
          />
        ))}
      </div>
    </div>
  );
}


export default App;
