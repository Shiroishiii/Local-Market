import React from 'react'
import './Configuracao.css';
import Navbar2 from '../components/Navbar2'
import { useState } from 'react'
import axios from 'axios'

function Configuracao() {
      const [inputCpf, setinpuCpf] = useState('')
    const [inputCNPJ, setinputCNPJ] = useState('')
    const [inputTelefone, setinputTelefone] = useState('')

  const cadastroLocatario = async () => {
    try{
      const cliente = {
        cpf: inputCpf,
        cnpj: inputCNPJ,
        telefone: inputTelefone
      };
      console.log("Dados enviados para API", cliente);
      
      const response = await axios.post('http://localhost:3001/usuario',cliente);
      console.log("res api", response.status);
      
      if(response.status === 201){
        localStorage.setItem("id_usuario", response.data.id_usuario);        
         
      } 
        }catch (error) {
        console.error('Erro ao adicionar locatario:', error);
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
        <input  className='input-form' type="text" placeholder='000.000.000-00'  value={inputCpf} onChange={(e) => setinpuCpf(e.target.value)}/>
        <label htmlFor="">CNPJ (caso tenha)</label>
        <input className='input-form' type="text" placeholder='00.000 000 0000 00' value={inputCNPJ} onChange={(e) => setinputCNPJ(e.target.value)}/>
        <label htmlFor="">Telefone</label>
        <input className='input-form' type="phone" placeholder='(99)9999-9999' value={inputTelefone} onChange={(e) => setinputTelefone(e.target.value)}/>
        <button  className='button-location' onClick={cadastroLocatario}>Cadastro de locatário</button>
      </div>
    </div>
    </div> 
  )
}

export default Configuracao
