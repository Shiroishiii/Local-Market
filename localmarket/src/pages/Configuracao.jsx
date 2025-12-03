import React from 'react'
import './Configuracao.css';
import Navbar2 from '../components/Navbar2'

function Configuracao() {


  return (
    <div>
      <Navbar2/>
    <div className='config-continer'>
      <div className='top-container'>
      </div>
      <div className='mid-form'>
        <h3 className='title'>COMPLETE SEU CADASTRO</h3>
        <label htmlFor="">CPF</label>
        <input  className='input-form' type="text" placeholder='000.000.000-00' />
        <label htmlFor="">CNPJ</label>
        <input className='input-form' type="text" placeholder='00.000 000 0000 00' />
        <label htmlFor="">Telefone</label>
        <input className='input-form' type="phone" placeholder='(99)9999-9999' />
        <button  className='button-location'>Cadastro de locatário</button>
      </div>
    </div>
    </div> 
  )
}

export default Configuracao
