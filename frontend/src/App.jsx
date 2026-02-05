import { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/musicbox"
});

function App() {
  const [albuns, setAlbuns] = useState([]);
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [artista, setArtista] = useState("");
  const [mensagem, setMensagem] = useState("");


  async function adicionarDisco(e) {
    e.preventDefault();
  
    if (!nome || !genero || !artista) {
    setMensagem("Preencha todos os campos");
      return;
    }

    try{
      const resposta = await axios.post("http://localhost:3000/musicbox", {
        nome,
        genero,
        artista
      });

      console.log("Álbum adicionado:", resposta.data);

    setNome("");
    setGenero("");
    setArtista("");
  } catch (erro) {
    console.error(erro.response?.data || erro.message);
  }
}


  // GET
  async function carregarAlbuns() {
    try {
      const res = await api.get("/");
      setAlbuns(res.data);
    } catch (error) {
      console.error("Erro ao carregar albuns:", error);
    }
  }

  useEffect(() => {
    carregarAlbuns();
  }, []);

  // POST
  async function adicionarAlbum() {
    try {
      const res = await api.post("/", {
        nome,
        genero,
        artista
      });

      // usa a resposta da API como fonte da verdade
      setAlbuns([...albuns, res.data]);

      setNome("");
      setGenero("");
      setArtista("");
    } catch (err) {
      console.error("Erro ao adicionar album:", err);
    }
  }

  // DELETE
  async function deletarMusica(id) {
    try {
      await api.delete(`/${id}`);
      setAlbuns(albuns.filter(a => a._id !== id));
    } catch (error) {
      console.error("Erro ao deletar música:", error);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>MusicBox</h1>

      <form
        onSubmit={adicionarDisco}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "300px"
        }}
      >
        <input
          type="text"
          placeholder="Nome do álbum"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />

        <input
          type="text"
          placeholder="Gênero"
          value={genero}
          onChange={e => setGenero(e.target.value)}
        />

        <input
          type="text"
          placeholder="Artista"
          value={artista}
          onChange={e => setArtista(e.target.value)}
        />

        <button type="submit">Enviar</button>
      </form>

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default App;