import React from 'react'
import { useState,useEffect } from 'react';
import './ControleFinanceiro.css'
import Navbar2 from '../components/Navbar2'

import ExtratoCard from "../components/ExtratoCard"; 

function ControleFinanceiro() {

  const [transacoes, setTransacoes] = useState('');

// useEffect(() => {
//     // Simulação de dados vindos do banco
//     const dadosFake = [
//       { id: 1, descricao: "Locação de bike", valor: -35.00, data: "2025-12-03" },
//       { id: 2, descricao: "Depósito", valor: 100.00, data: "2025-12-01" }
//     ];

//     setTransacoes(dadosFake);
//   }, []);

  return (
    
    
    <div className='controleFinanceiro-container'>
     
            <Navbar2/>
     

        <div className='transacoes-controleFinanceiro'>

            <div className='titulo-controleFinaceiro'>
             <h1>Controle Financeiro</h1>
            </div>
            <div className='informacoes-controleFinanceiro'>
                   {transacoes.length === 0 ? (
        <p>Nenhuma movimentação encontrada.</p>
      ) : (
        transacoes.map(t => (
          <ExtratoCard
            key={t.id}
            descricao={t.descricao}
            valor={t.valor}
            data={t.data}
          />
        ))
      )}
            </div>
            
                 
         
            </div>


    </div>
  )
}

export default ControleFinanceiro