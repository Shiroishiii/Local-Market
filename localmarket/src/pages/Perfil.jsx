import { useState, useContext, useEffect } from 'react';
import './Perfil.css';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';
import axios from "axios";

function Perfil() {
  const { usuarioLogado, setUsuarioLogado } = useContext(GlobalContext);
  const navigate = useNavigate();
  console.log("DADOS DO USUÁRIO:", usuarioLogado);

  const [fotoPerfil, setFotoPerfil] = useState(
    usuarioLogado?.imagem ? `/img/${usuarioLogado.imagem}` : "/img/user.png"
  );
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Função quando o usuário seleciona uma imagem
  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    // Verificar se o usuário está logado
    if (!usuarioLogado?.id_usuario) {
      setModalMessage("Você precisa estar logado para alterar a imagem!");
      setShowModal(true);
      return;
    }

    // Pegamos apenas o nome da imagem (sem upload)
    const nomeDaImagem = file.name;

    // Atualiza visualmente a foto no perfil
    setFotoPerfil(`/img/${nomeDaImagem}`);

    try {
      console.log("usuarioLogado:", usuarioLogado);
      console.log("ID:", usuarioLogado.id_usuario);

      // Salvar imagem no backend
      const response = await axios.post("http://localhost:3001/usuario/salvar-imagem", {
        id_usuario: usuarioLogado.id_usuario,
        imagem: nomeDaImagem
      });

      console.log("Resposta do servidor:", response.data);

      // O backend agora retorna o usuário atualizado na resposta
      if (response.data.usuario) {
        console.log("Usuário atualizado:", response.data.usuario);
        // Atualizar o contexto (que automaticamente salva no localStorage)
        setUsuarioLogado(response.data.usuario);
      } else {
        // Fallback: buscar usuário atualizado do banco se não vier na resposta
        const updatedUser = await axios.get(`http://localhost:3001/usuario/${usuarioLogado.id_usuario}`);
        console.log("Usuário atualizado (fallback):", updatedUser.data);
        setUsuarioLogado(updatedUser.data);
      }

      setModalMessage("Imagem atualizada com sucesso!");
      setShowModal(true);
    } catch (error) {
      console.error("Erro completo:", error);
      console.error("Resposta do erro:", error.response?.data);
      setModalMessage(`Erro ao salvar imagem: ${error.response?.data?.error || error.message}`);
      setShowModal(true);
      // Reverter para a imagem anterior em caso de erro
      if (usuarioLogado?.imagem) {
        setFotoPerfil(`/img/${usuarioLogado.imagem}`);
      } else {
        setFotoPerfil("/img/user.png");
      }
    }
  };



  useEffect(() => {
    async function carregarUsuario() {
      // Só carrega se tiver id_usuario válido
      if (usuarioLogado?.id_usuario) {
        try {
          const response = await axios.get(`http://localhost:3001/usuario/${usuarioLogado.id_usuario}`);
          if (response.data) {
            setUsuarioLogado(response.data); // Atualiza o contexto com o que veio do banco
          }
        } catch (err) {
          console.error("Erro ao buscar usuário:", err);
          // Se der erro, pode ser que o usuário não existe mais, mas não vamos limpar tudo
        }
      }
    }

    carregarUsuario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Só executa uma vez ao montar

  // Atualizar fotoPerfil quando usuarioLogado.imagem mudar
  useEffect(() => {
    if (usuarioLogado?.imagem) {
      setFotoPerfil(`/img/${usuarioLogado.imagem}`);
    } else {
      setFotoPerfil("/img/user.png");
    }
  }, [usuarioLogado?.imagem]);

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('id_usuario');
    setUsuarioLogado({
      id_usuario: null,
      nome: "",
      email: "",
      senha: "",
      cidade: null,
      rua: null,
      bairro: null,
      estado: null,
      cep: null,
      cpf: '',
      cnpj: null,
      telefone: '',
      tipo: null,
      imagem: null
    });
    navigate('/login');
  };





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

          {/* <Link to={'/configuracao'} className='link-das-coisas'>
            <button className='button-sidebar'><p>Configurações</p></button>
          </Link> */}

          <button className="button-logout" onClick={handleLogout}>
            <p>Sair</p>
          </button>
        </div>
      </div>

      <div className='central'>

        <div className='container-foto-perfil'>
          <div className='parteDaFoto'>
            {/* FOTO DO PERFIL */}
            <img src={fotoPerfil} alt="Foto de perfil"/>

            {/* INPUT HIDDEN */}
            <input
              id="inputFile"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
          
          {/* BOTÃO DO LÁPIS QUE ABRE O INPUT - Fora da foto para sobrepor */}
          <button
            className='button-edit'
            onClick={() => document.getElementById("inputFile").click()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 256 256">
              <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
            </svg>
          </button>
        </div>

        <div className='info-usuario'>
          <div className='principal-info'>
            <label>{usuarioLogado?.nome || "Usuário"}</label>
            <label>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M3.87 4h13.25C18.37 4 19 4.59 19 5.79v8.42c0 1.19-.63 1.79-1.88 1.79H3.87c-1.25 0-1.88-.6-1.88-1.79V5.79c0-1.2.63-1.79 1.88-1.79m6.62 8.6l6.74-5.53c.24-.2.43-.66.13-1.07c-.29-.41-.82-.42-1.17-.17l-5.7 3.86L4.8 5.83c-.35-.25-.88-.24-1.17.17c-.3.41-.11.87.13 1.07z"/></svg>
              {usuarioLogado?.email || "N/A"}
            </label>
            <label>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m16.556 12.906l-.455.453s-1.083 1.076-4.038-1.862s-1.872-4.014-1.872-4.014l.286-.286c.707-.702.774-1.83.157-2.654L9.374 2.86C8.61 1.84 7.135 1.705 6.26 2.575l-1.57 1.56c-.433.432-.723.99-.688 1.61c.09 1.587.808 5 4.812 8.982c4.247 4.222 8.232 4.39 9.861 4.238c.516-.048.964-.31 1.325-.67l1.42-1.412c.96-.953.69-2.588-.538-3.255l-1.91-1.039c-.806-.437-1.787-.309-2.417.317"/></svg>
              {usuarioLogado?.telefone || "N/A"}
            </label>
          </div>

          {/* <div className='outras-informacao'>
            <label>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
              </svg>
              Endereço
            </label>
            {usuarioLogado?.rua && (
              <label style={{ fontSize: '14px', fontWeight: '400', color: '#666' }}>
                {usuarioLogado.rua}
              </label>
            )}
            {(usuarioLogado?.cidade || usuarioLogado?.bairro || usuarioLogado?.estado) && (
              <label style={{ fontSize: '14px', fontWeight: '400', color: '#666' }}>
                {[usuarioLogado.bairro, usuarioLogado.cidade, usuarioLogado.estado].filter(Boolean).join(', ')}
              </label>
            )}
            {usuarioLogado?.cep && (
              <label style={{ fontSize: '14px', fontWeight: '400', color: '#666' }}>
                CEP: {usuarioLogado.cep}
              </label>
            )}
            {!usuarioLogado?.rua && !usuarioLogado?.cidade && (
              <label style={{ fontSize: '14px', fontWeight: '400', color: '#999', fontStyle: 'italic' }}>
                Nenhum endereço cadastrado
              </label>
            )}
          </div> */}
        </div>

      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <h3>{modalMessage}</h3>
            <button onClick={() => setShowModal(false)} className="button-close-modal">Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Perfil;
