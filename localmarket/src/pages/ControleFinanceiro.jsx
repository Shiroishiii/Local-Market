import React from 'react'
import { useState, useEffect,useContext } from 'react';
import './ControleFinanceiro.css'
import Navbar2 from '../components/Navbar2'
import { GlobalContext } from '../contexts/GlobalContext'
import ExtratoCard from "../components/ExtratoCard";

function ControleFinanceiro() {
   const {usuarioLogado} = useContext(GlobalContext)
  const [transacoes, setTransacoes] = useState([]);

  async function fetchDadosUser() {
    try {
      const res = await fetch(`http://localhost:3001/aluguelporusuario/${usuarioLogado.id_usuario}`)
      const data = await res.json()

      console.log("retorno da api", data)

      setTransacoes(data)
      
    } catch (error) {
      console.error("deu ruim aqui, não foi possivel conectar com o servidor, chama o samu", error)
    }
  }


  useEffect(() => {
    fetchDadosUser()
  }, []);

  return (


    <div className='controleFinanceiro-container'>

      <Navbar2 />


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
                key={t.id_aluguel}
                nome_item={t.nome_item}
                valor_total={Number(t.valor_total)}
                data_inicio={t.data_inicio}
              />
            ))
          )}
        </div>



      </div>


    </div>
  )
}

export default ControleFinanceiro