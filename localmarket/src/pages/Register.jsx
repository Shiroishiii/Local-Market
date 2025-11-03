import Navbar2 from '../components/Navbar2'
import './Register.css'

function Register() {
  return (
    <div>
      <Navbar2 />
      <div className='register-container'>
        {/* From Uiverse.io by akshat-patel28 */}
        <div className="form-container">
          <p className="title">Cadastre-se</p>
          <form class="form">
            <input type="text" className='input' placeholder='Nome de usuário' />
            <input type="email" className="input" placeholder="Email" />
            <input type="password" className="input" placeholder="Senha" />
            <button className="form-btn">Cadastrar-se</button>
          </form>
          <p className="sign-up-label">
            Já tem uma conta?<span className="sign-up-link">Faça login</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register