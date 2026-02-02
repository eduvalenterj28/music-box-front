import { useEffect, useState } from "react";

function App() {
  const [musicas, setMusicas] = useState([]);
  const [nome, setNome] = useState("");
  const [album, setAlbum] = useState("");
  const [artista, setArtista] = useState("");

  // GET
  useEffect(() => {
    carregarMusicas();
  }, []);

  function carregarMusicas() {
    fetch("http://localhost:3000/teste")
      .then(res => res.json())
      .then(data => setMusicas(data))
      .catch(err => console.error(err));
  }

  // POST
  function adicionarMusica() {
    const novaMusica = { nome, album, artista };

    fetch("http://localhost:3000/teste", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(novaMusica)
    })
      .then(res => res.json())
      .then(musicaCriada => {
        // atualiza a lista sem novo GET
        setMusicas([...musicas, musicaCriada]);

        // limpa inputs
        setNome("");
        setAlbum("");
        setArtista("");
      });
  }

  return (
    <div>
      <h1>Cadastro de músicas</h1>

      <input
        placeholder="Nome"
        value={nome}
        onChange={e => setNome(e.target.value)}
      />

      <input
        placeholder="Álbum"
        value={album}
        onChange={e => setAlbum(e.target.value)}
      />

      <input
        placeholder="Artista"
        value={artista}
        onChange={e => setArtista(e.target.value)}
      />

      <button onClick={adicionarMusica}>Adicionar</button>

      <hr />

      {musicas.map(musica => (
        <div key={musica.id}>
          <p>{musica.nome} — {musica.artista} ({musica.album})</p>
          <button onClick={() => deletarMusica(musica.id)}>
            Deletar
          </button>
        </div>
      ))}
    </div>
  );

  // DELETE
  function deletarMusica(id) {
    fetch(`http://localhost:3000/teste/${id}`, {
      method: "DELETE"
    }).then(() => {
      setMusicas(musicas.filter(m => m.id !== id));
    });
  }
}

export default App;