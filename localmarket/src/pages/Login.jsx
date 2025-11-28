import Navbar2 from '../components/Navbar2'
import './Login.css'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

  function Login() {
    const[ inputEmailLogin, setinputEmailLogin] = useState('')
    const[ inputSenhaLogin, setinputSenhaLogin] = useState('')
    const navigate = useNavigate();

    const Logar = async () => {
      try{
        const cliente = {
          email: inputEmailLogin.trim(),
          senha: inputSenhaLogin
        }
        console.log("Dados enviados para API", cliente);
      
        const response = await axios.post('http://localhost:3001/login', cliente);
        console.log("res api", response.status);
        
        if(response.status === 200){
          
   
           navigate('/');
        } 
          }catch (error) {
          console.error('Erro ao logar:', error);
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
            <input type="text" className="input" placeholder="Nome de usuário" onChange={(event) => setinputEmailLogin(event.target.value)}  />
            <input type="password" className="input" placeholder="Senha"  onChange={(e) => setinputSenhaLogin(e.target.value)}/>
            <p className="page-link">
              {/* <span className="page-link-label">Esqueceu a senha?</span> */}
            </p>
            <button type='button'  onClick={Logar} className="form-btn">Login</button>
          </form>
          <p className="sign-up-label">
            Não tem uma conta?<Link to={'/registro'}><span className="sign-up-link">Cadastre-se</span></Link>
          </p>
        </div>
      </div>
    </div>
  )
}


export default Login