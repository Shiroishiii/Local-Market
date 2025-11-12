import Navbar2 from '../components/Navbar2'
import './Login.css'

function Login() {
  return (
    <div>
      <Navbar2 />
        <div className='login-container'>
        {/* From Uiverse.io by akshat-patel28 */}
          <div className="form-container">
            <p className="title">Fazer Login</p>
            <form className="form">
              <input type="text" className="input" placeholder="Nome de usuário"/>
              <input type="password" className="input" placeholder="Senha"/>
              <p className="page-link">
                <span className="page-link-label">Esqueceu a senha?</span>
              </p>
              <button className="form-btn">Login</button>
            </form>
            <p className="sign-up-label">
              Não tem uma conta?<span className="sign-up-link">Cadastre-se</span>
            </p>
          </div>
        </div>
    </div>
      )
}

      export default Login