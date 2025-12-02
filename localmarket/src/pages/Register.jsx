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
      console.log("Dados enviados para API", cliente);
      
      const response = await axios.post('http://localhost:3001/usuario',cliente);
      console.log("res api", response.status);
      
      if(response.status === 201){
        localStorage.setItem("id_usuario", response.data.id_usuario);        
         limparForm()
      } 
        }catch (error) {
        console.error('Erro ao adicionar cliente:', error);
      }

    
    };


    
    function limparForm(){
      setinputNomeUsuario(''),
      setinputEmail(''),
      setinputSenha('')

    }

    
    
    return (
    <div>
      <Navbar2 />
      <div className='register-container'>
        {/* From Uiverse.io by akshat-patel28 */}
        <div className="form-container">
          <p className="title">Cadastre-se</p>
          <div className="form">
            <input type="text" className='input' placeholder='Nome de usuário' onChange={(event) => setinputNomeUsuario(event.target.value)}/>
            <input type="email" className="input" placeholder="Email" onChange ={(event) => setinputEmail(event.target.value)} />
            <input type="password" className="input" placeholder="Senha" onChange={(event) => setinputSenha(event.target.value)} />
            <button className="form-btn" onClick={cadastrarCliente}>Cadastrar-se</button>
          </div>
          <p className="sign-up-label">
            Já tem uma conta?<Link to = {'/login'}> <span className="sign-up-link">Faça login</span></Link>
          </p>
        </div>
      </div>
    </div>
  )
}
 
  
  export default Register