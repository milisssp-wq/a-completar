// TODO 2: importar useState y useEffect desde react.
import { useState, useEffect } from "react";
import TarjetaPerro from "./components/TarjetaPerro";
import "./styles.css";

function App() {
  // TODO 2: reemplazar estas constantes por estados con useState.
  // Crear también sus setters: setImagen, setCargando y setError.
  const [imagen, setImagen] = useState("");
  const [cargando, setCargando ] = useState(false);
  const [error, setError ] = useState("");

  async function buscarPerro() {
    // https://dog.ceo/api/breeds/image/random 
  setCargando(true)
    try {
       const respuesta = await fetch("https://dog.ceo/api/breeds/image/random");
       console.log (respuesta);
       if (!respuesta.ok) {
        // entro aca si hubo un error
        throw new Error ("Fallo consulta")
       }
       const datos = await respuesta.json();
       console.log(datos)
       setImagen(datos.message);
    } catch {
      setError("Fallo consulta");
    } finally {
      setCargando(false);

    }
  }

    useEffect(() =>{
      buscarPerro();
    }, []); 


  return (
    <main>
      <h1>Explorador de perros</h1>
      <p>Descubrí un nuevo perro con cada clic.</p>

      {cargando && <p role="status">Buscando un perro...</p>}
      {error && <p role="alert">{error}</p>}

      {/* TODO 1: pasar las props titulo e imagen a la tarjeta. */}
      <TarjetaPerro imagen= {imagen}/>

      <button onClick={buscarPerro} disabled={cargando}>
        {cargando ? "Cargando..." : "Ver otro perro"}
      </button>
    </main>
  );
}

export default App;
