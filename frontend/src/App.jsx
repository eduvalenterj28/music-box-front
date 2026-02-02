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
    return <p>Nenhuma música cadastrada</p>;
  }

  return (
    <div>
      <h1>Dados vindos do backend</h1>

      {musicas.map(musica => (
        <div key={musica.id}>
          <p>Nome: {musica.nome}</p>
          <p>Álbum: {musica.album}</p>
          <p>Artista: {musica.artista}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;