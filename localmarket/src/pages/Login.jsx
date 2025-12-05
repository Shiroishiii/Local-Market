import Navbar2 from '../components/Navbar2'
import './Login.css'
import { useState,useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { GlobalContext } from '../contexts/GlobalContext'

function Login() {
  const [inputEmail, setinputEmail] = useState('')
  const [inputSenha, setinputSenha] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setUsuarioLogado} = useContext(GlobalContext)

  const navigate = useNavigate();

  // const Logar = async () => {
  //   try{
  //     const cliente = {
  //       email: inputEmail.trim(),
  //       senha: inputSenha
  //     }
  //     console.log("Dados enviados para API", cliente);

  //     const response = await axios.post('http://localhost:3001/usuario',cliente);
  //     console.log("res api", response.status);

  //     if(response.status === 201){

  //        limparForm()
  //        navigate('/');
  //     } 
  //       }catch (error) {
  //       console.error('Erro ao adicionar cliente:', error);
  //     }

  //   };

  const Logar = async () => {
    try {
      const loginData = {
        email: inputEmail.trim(),
        senha: inputSenha
      };

      console.log("Enviando login:", loginData);

      const res = await axios.post('http://localhost:3001/login', loginData);

      console.log("Login OK:", res.data);
      setNomeUsuario(res.data.nome);
      setUsuarioLogado(res.data);
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate('/');
      }, 2000);  // fecha após 2s e redireciona

    } catch (err) {
      let msg = "Erro ao fazer Login"
      if (err.response && err.response.status === 401) {
        msg = err.response.data.error
      }

      setErrorMessage(msg)
      setShowErrorModal(true)

      setTimeout(() => setShowErrorModal(false), 2000)

      console.log(err)
    }
  };



  return (
    <div>
      <Navbar2 />
      <div className='login-container'>
        {/* From Uiverse.io by akshat-patel28 */}
        <div className="form-container">
          <p className="title">Fazer Login</p>
          <form className="form">
            <input type="text" className="input" placeholder="Email" onChange={(event) => setinputEmail(event.target.value)} />
            <input type="password" className="input" placeholder="Senha" onChange={(e) => setinputSenha(e.target.value)} />
            <p className="page-link">
              {/* <span className="page-link-label">Esqueceu a senha?</span> */}
            </p>
            <button type='button' onClick={Logar} className="form-btn">Login</button>
          </form>
          <p className="sign-up-label">
            Não tem uma conta?<Link to={'/registro'}><span className="sign-up-link">Cadastre-se</span></Link>
          </p>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20"><path fill="currentColor" d="M10 20a10 10 0 0 1 0-20a10 10 0 1 1 0 20m-2-5l9-8.5L15.5 5L8 12L4.5 8.5L3 10z"/></svg>
            <p>Bem-vindo, {nomeUsuario}</p>
          </div>
        </div>
      )}
      {showErrorModal && (
        <div className="modal-overlay-error">
          <div className="modal-content-error">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path fill="currentColor" fill-rule="evenodd" d="M256 42.667c117.803 0 213.334 95.53 213.334 213.333S373.803 469.334 256 469.334S42.667 373.803 42.667 256S138.197 42.667 256 42.667m48.918 134.25L256 225.836l-48.917-48.917l-30.165 30.165L225.835 256l-48.917 48.918l30.165 30.165L256 286.166l48.918 48.917l30.165-30.165L286.166 256l48.917-48.917z" /></svg>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}
    </div>
  )
}


export default Login