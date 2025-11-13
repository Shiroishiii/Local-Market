import { Link, useSearchParams } from 'react-router-dom'
import Navbar2 from '../components/Navbar2'
import './Register.css'
import { useState } from 'react'
import axios from 'axios'

function Register() {
    const [inputNomeUsuario, setinputNomeUsuario] = useState('')
    const [inputEmail, setinputEmail] = useState('')
    const [inputSenha, setinputSenha] = useState('')

  const cadastrarCliente = async () => {
    try{
      const cliente = {
        nome: inputNomeUsuario.trim(),
        email: inputEmail.trim(),
        senha: inputSenha
      };
      const response = await axios.post('http://localhost:3001/usuario',cliente);
      if(response.status === 201){
        limparForm()
      } 
        }catch (error) {
        console.error('Erro ao adicionar cliente:', error);
      }
      if (!cliente.email) {
        alert("O campo de e-mail é obrigatório!");
        return;
      }
      

    };

    function limparForm(){
      setNomeUsuario (''),
      setinputEmail (''),
      setinputSenha ('')

    }

    
    
    return (
    <div>
      <Navbar2 />
      <div className='register-container'>
        {/* From Uiverse.io by akshat-patel28 */}
        <div className="form-container">
          <p className="title">Cadastre-se</p>
          <div className="form">
            <input type="text" className='input' placeholder='Nome de usuário' />
            <input type="email" className="input" placeholder="Email" />
            <input type="password" className="input" placeholder="Senha" />
            <button className="form-btn" onClick={cadastrarCliente}>Cadastrar-se</button>
          </div>
          <p className="sign-up-label">
            Já tem uma conta?<span className="sign-up-link">Faça login</span>
          </p>
        </div>
      </div>
    </div>
  )
}
  
  
  export default Register