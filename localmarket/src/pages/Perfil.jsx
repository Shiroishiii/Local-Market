import { useState, useContext, useEffect } from 'react';
import './Perfil.css';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';
import axios from "axios";

function Perfil() {
  const { usuarioLogado, setUsuarioLogado } = useContext(GlobalContext);
  console.log("DADOS DO USUÁRIO:", usuarioLogado);

  const [fotoPerfil, setFotoPerfil] = useState(
    usuarioLogado.foto ? `/img/${usuarioLogado.foto}` : "./img/user.svg"
  );

  // Função quando o usuário seleciona uma imagem
  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    // Pegamos apenas o nome da imagem (sem upload)
    const nomeDaImagem = file.name;

    // Atualiza visualmente a foto no perfil
    setFotoPerfil(`/img/${nomeDaImagem}`);

    try {
      console.log("usuarioLogado:", usuarioLogado);
      console.log("ID:", usuarioLogado.id);

      await axios.post("http://localhost:3001/usuario/salvar-imagem", {
        id_usuario: usuarioLogado.id_usuario,
        imagem: nomeDaImagem
      });
      const updatedUser = await axios.get(`http://localhost:3001/usuario/${usuarioLogado.id_usuario}`);
        setUsuarioLogado(updatedUser.data);

      alert("Imagem atualizada com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar imagem no servidor.");
    }
  };



  useEffect(() => {
  async function carregarUsuario() {
    try {
      const response = await axios.get(`http://localhost:3001/usuario/${usuarioLogado.id_usuario}`);
      setUsuarioLogado(response.data); // Atualiza o contexto com o que veio do banco
    } catch (err) {
      console.error("Erro ao buscar usuário:", err);
    }
  }

  carregarUsuario();
}, []);





  return (
    <div className='perfil-container'>
      <div className='sidebar-container'>
        <h1 className='title-perfil'>LOCAL <span className='title-highlight'>MARKET</span></h1>

        <div className='sidebar-options'>
          <Link to={'/controleFinanceiro'} className='link-das-coisas'>
            <button className='button-sidebar'><p>Controle Financeiro</p></button>
          </Link>

          <Link to={'/carrinho'} className='link-das-coisas'>
            <button className='button-sidebar'><p>Carrinho</p></button>
          </Link>

          <Link to="/login" className="link-das-coisas">
            <button className="button-logout"><p>Sair</p></button>
          </Link>
        </div>
      </div>

      <div className='central'>

        {/* BOTÃO DO LÁPIS QUE ABRE O INPUT */}
        <button
          className='button-edit'
          onClick={() => document.getElementById("inputFile").click()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffffff" viewBox="0 0 256 256">
            <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
          </svg>
        </button>

        <div className='container-foto-perfil'>
          <div className='parteDaFoto'>
            {/* FOTO DO PERFIL */}
            <img src={`/img/${usuarioLogado?.imagem || "default.png"}`} alt="Foto de perfil"/>

            {/* INPUT HIDDEN */}
            <input
              id="inputFile"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <div className='info-usuario'>
          <div className='principal-info'>
            <label>{usuarioLogado.nome}</label>
            <label>Email: {usuarioLogado.email}</label>
            <label>Telefone: {usuarioLogado.telefone}</label>
          </div>

          <div className='outras-informacao'>
            <label>endereco</label>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Perfil;
