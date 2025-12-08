import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Navbar2 from '../components/Navbar2'
import './Register.css'
import { useState } from 'react'
import axios from 'axios'



function Register() {
    const [inputNomeUsuario, setinputNomeUsuario] = useState('')
    const [inputEmail, setinputEmail] = useState('')
    const [inputSenha, setinputSenha] = useState('')
    const [inputCPF, setinputCPF] = useState('')
    const [inputTelefone, setinputTelefone] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate('')

    // Função para formatar CPF: XXX.XXX.XXX-XX
    const formatarCPF = (valor) => {
        const apenasNumeros = valor.replace(/\D/g, '');
        const numerosLimitados = apenasNumeros.slice(0, 11);
        
        if (numerosLimitados.length <= 3) {
            return numerosLimitados;
        } else if (numerosLimitados.length <= 6) {
            return `${numerosLimitados.slice(0, 3)}.${numerosLimitados.slice(3)}`;
        } else if (numerosLimitados.length <= 9) {
            return `${numerosLimitados.slice(0, 3)}.${numerosLimitados.slice(3, 6)}.${numerosLimitados.slice(6)}`;
        } else {
            return `${numerosLimitados.slice(0, 3)}.${numerosLimitados.slice(3, 6)}.${numerosLimitados.slice(6, 9)}-${numerosLimitados.slice(9)}`;
        }
    };

    const handleCPFChange = (e) => {
        const valorFormatado = formatarCPF(e.target.value);
        setinputCPF(valorFormatado);
    };

    // Função para formatar telefone: (XX) XXXXX-XXXX
    const formatarTelefone = (valor) => {
        const apenasNumeros = valor.replace(/\D/g, '');
        const numerosLimitados = apenasNumeros.slice(0, 11);
        
        if (numerosLimitados.length <= 2) {
            return numerosLimitados;
        } else if (numerosLimitados.length <= 7) {
            return `(${numerosLimitados.slice(0, 2)}) ${numerosLimitados.slice(2)}`;
        } else {
            return `(${numerosLimitados.slice(0, 2)}) ${numerosLimitados.slice(2, 7)}-${numerosLimitados.slice(7)}`;
        }
    };

    const handleTelefoneChange = (e) => {
        const valorFormatado = formatarTelefone(e.target.value);
        setinputTelefone(valorFormatado);
    };

    // Função para validar email
    const validarEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

  const cadastrarCliente = async () => {
    // Validações
    if (!inputNomeUsuario.trim()) {
      setModalMessage('Por favor, preencha o nome!');
      setShowModal(true);
      return;
    }

    if (!validarEmail(inputEmail)) {
      setModalMessage('Por favor, insira um email válido!');
      setShowModal(true);
      return;
    }

    if (!inputSenha || inputSenha.length < 6) {
      setModalMessage('A senha deve ter pelo menos 6 caracteres!');
      setShowModal(true);
      return;
    }

    const cpfNumeros = inputCPF.replace(/\D/g, '');
    if (cpfNumeros.length !== 11) {
      setModalMessage('Por favor, insira um CPF válido! (11 dígitos)');
      setShowModal(true);
      return;
    }

    const telefoneNumeros = inputTelefone.replace(/\D/g, '');
    if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
      setModalMessage('Por favor, insira um telefone válido! (10 ou 11 dígitos)');
      setShowModal(true);
      return;
    }

    try{
      const cliente = {
        nome: inputNomeUsuario.trim(),
        email: inputEmail.trim(),
        senha: inputSenha,
        cpf: cpfNumeros,
        telefone: telefoneNumeros
      };
      console.log("Dados enviados para API", cliente);
      
      const response = await axios.post('http://localhost:3001/usuario',cliente);
      console.log("res api", response.status);
      
      if(response.status === 201){
        (localStorage.setItem("id_usuario", response.data.id_usuario));        
         limparForm()
         setModalMessage('Cadastro realizado com sucesso!');
         setShowModal(true);
         setTimeout(() => {
           navigate('/login')
         }, 2000);
      } 
        }catch (error) {
        console.error('Erro ao adicionar cliente:', error);
        setModalMessage(error.response?.data?.error || 'Erro ao cadastrar. Tente novamente.');
        setShowModal(true);
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
            <input type="text" className='input' placeholder='Nome de usuário' value={inputNomeUsuario} onChange={(event) => setinputNomeUsuario(event.target.value)}/>
            <input type="email" className="input" placeholder="Email" value={inputEmail} onChange={(event) => setinputEmail(event.target.value)} />
            <input type="password" className="input" placeholder="Senha (mínimo 6 caracteres)" value={inputSenha} onChange={(event) => setinputSenha(event.target.value)} minLength={6} />
            <input type="text" className="input" placeholder="CPF (000.000.000-00)" value={inputCPF} onChange={handleCPFChange} maxLength={14} />
            <input type="tel" className="input" placeholder="Telefone ((11) 99999-9999)" value={inputTelefone} onChange={handleTelefoneChange} maxLength={15} />
            <button className="form-btn" onClick={cadastrarCliente}>Cadastrar-se</button>
          </div>
          <p className="sign-up-label">
            Já tem uma conta?<Link to = {'/login'}> <span className="sign-up-link">Faça login</span></Link>
          </p>
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
  )
}
 
  
  export default Register