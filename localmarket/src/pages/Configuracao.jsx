import React from 'react'
import './Configuracao.css';
import Navbar2 from '../components/Navbar2'
import { useState } from 'react'
import axios from 'axios'

function Configuracao() {
      const [inputCpf, setinpuCpf] = useState('')
    const [inputCNPJ, setinputCNPJ] = useState('')
    const [inputTelefone, setinputTelefone] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

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
        setinpuCpf(valorFormatado);
    };

    // Função para formatar CNPJ: XX.XXX.XXX/XXXX-XX
    const formatarCNPJ = (valor) => {
        const apenasNumeros = valor.replace(/\D/g, '');
        const numerosLimitados = apenasNumeros.slice(0, 14);
        
        if (numerosLimitados.length <= 2) {
            return numerosLimitados;
        } else if (numerosLimitados.length <= 5) {
            return `${numerosLimitados.slice(0, 2)}.${numerosLimitados.slice(2)}`;
        } else if (numerosLimitados.length <= 8) {
            return `${numerosLimitados.slice(0, 2)}.${numerosLimitados.slice(2, 5)}.${numerosLimitados.slice(5)}`;
        } else if (numerosLimitados.length <= 12) {
            return `${numerosLimitados.slice(0, 2)}.${numerosLimitados.slice(2, 5)}.${numerosLimitados.slice(5, 8)}/${numerosLimitados.slice(8)}`;
        } else {
            return `${numerosLimitados.slice(0, 2)}.${numerosLimitados.slice(2, 5)}.${numerosLimitados.slice(5, 8)}/${numerosLimitados.slice(8, 12)}-${numerosLimitados.slice(12)}`;
        }
    };

    const handleCNPJChange = (e) => {
        const valorFormatado = formatarCNPJ(e.target.value);
        setinputCNPJ(valorFormatado);
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

  const cadastroLocatario = async () => {
    // Validações
    const cpfNumeros = inputCpf.replace(/\D/g, '');
    if (cpfNumeros.length !== 11) {
      setModalMessage('Por favor, insira um CPF válido! (11 dígitos)');
      setShowModal(true);
      return;
    }

    // CNPJ é opcional, mas se preenchido deve ser válido
    if (inputCNPJ) {
      const cnpjNumeros = inputCNPJ.replace(/\D/g, '');
      if (cnpjNumeros.length !== 14) {
        setModalMessage('Por favor, insira um CNPJ válido! (14 dígitos) ou deixe em branco.');
        setShowModal(true);
        return;
      }
    }

    const telefoneNumeros = inputTelefone.replace(/\D/g, '');
    if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
      setModalMessage('Por favor, insira um telefone válido! (10 ou 11 dígitos)');
      setShowModal(true);
      return;
    }

    try{
      const cliente = {
        cpf: cpfNumeros,
        cnpj: inputCNPJ ? inputCNPJ.replace(/\D/g, '') : null,
        telefone: telefoneNumeros
      };
      console.log("Dados enviados para API", cliente);
      
      const response = await axios.post('http://localhost:3001/usuario',cliente);
      console.log("res api", response.status);
      
      if(response.status === 201){
        localStorage.setItem("id_usuario", response.data.id_usuario);
        setModalMessage('Cadastro atualizado com sucesso!');
        setShowModal(true);
      } 
        }catch (error) {
        console.error('Erro ao adicionar locatario:', error);
        setModalMessage(error.response?.data?.error || 'Erro ao atualizar cadastro. Tente novamente.');
        setShowModal(true);
      }

    
    };

  return (
    <div>
      <Navbar2/>
    <div className='config-continer'>
      <div className='top-container'>
      </div>
      <div className='mid-form'>
        <h3 className='title'>COMPLETE SEU CADASTRO</h3>
        <label htmlFor="">CPF</label>
        <input  className='input-form' type="text" placeholder='000.000.000-00'  value={inputCpf} onChange={handleCPFChange} maxLength={14} />
        <label htmlFor="">CNPJ (caso tenha)</label>
        <input className='input-form' type="text" placeholder='00.000.000/0000-00' value={inputCNPJ} onChange={handleCNPJChange} maxLength={18} />
        <label htmlFor="">Telefone</label>
        <input className='input-form' type="tel" placeholder='(11) 99999-9999' value={inputTelefone} onChange={handleTelefoneChange} maxLength={15} />
        <button  className='button-confirm' onClick={cadastroLocatario}>Cadastro de locatário</button>
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

export default Configuracao
