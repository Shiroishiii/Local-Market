import React from 'react'
import './Perfil.css'


function Perfil() {
  return (
    <div className='perfil-container'>
        <div className='left-options'>
        <h3>LOCAL MARKET</h3>
        <ul>
            <ol>Ajuda/Suporte</ol>
            <ol>Deslogar</ol>
            <ol>Histórico de transações</ol>
            <ol>Registro Financeiro</ol>
        </ul>
        </div>
        <div className='central'>
            <img  className='info-perfil' src="" alt="" />
            <h2 className='info'>Rodrigo Costa</h2>
            <h3 className='info'> rodrigocosta@gmail.com</h3>
        </div>
        
    </div>
    
  )
}

export default Perfil
