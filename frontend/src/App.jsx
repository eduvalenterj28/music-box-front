import { useEffect, useState } from "react";

function App() {
  const [musicas, setMusicas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/teste")
      .then(res => res.json())
      .then(data => setMusicas(data))
      .catch(err => console.error(err));
  }, []);

  if (musicas.length === 0) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Dados vindos do backend</h1>
      <p>ID: {musicas[0].id}</p>
      <p>Faixa: {musicas[0].musica}</p>
      <p>Álbum: {musicas[0].album}</p>
      <p>Artista: {musicas[0].artista}</p>
    </div>
  );
}

export default App;


