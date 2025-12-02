import React from 'react'
import { Link } from 'react-router-dom'
import './HistoricoTransacoes.css'
import Navbar2 from '../components/Navbar2'
function HistoricoTransacoes() {
  function informacoesTabela(){
    
  }

  return (
    <div className='historico-transacoes-container'>
      <Navbar2 />

      <div className='historico-financeiro-central'>
        <div className='tabela-historico'>
          <div className='navbar-titulo'>
         <h1 className='titolo-historico'>Historico de Transações</h1>
          </div>
          <div className='informacoes-tabela'>

          </div>
        </div>
      </div>



    </div>
  )
}

export default HistoricoTransacoes