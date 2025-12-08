import React, { useState, useEffect, useContext } from 'react'
import './ControleFinanceiro.css'
import Navbar2 from '../components/Navbar2'
import { GlobalContext } from '../contexts/GlobalContext'
import ExtratoCard from "../components/ExtratoCard"

function ControleFinanceiro() {

  const { usuarioLogado } = useContext(GlobalContext)
  const [transacoes, setTransacoes] = useState([])
  const [filtro, setFiltro] = useState("todos")


  async function buscarTransacoes() {
    try {
      const res = await fetch(`http://localhost:3001/aluguelporusuario/${usuarioLogado.id_usuario}`)
      const data = await res.json()
      setTransacoes(data || [])
    } catch (err) {
      console.log("Erro ao pegar dados do usuário:", err)
    }
  }

  useEffect(() => {
    buscarTransacoes()
  }, [])


  function diasPassados(data) {
    const hoje = new Date()
    const inicio = new Date(data)
    const diff = hoje - inicio
    return Math.floor(diff / (1000 * 60 * 60 * 24))
  }

  function resumoPeriodo(lista, diasMax) {
    const filtrados = lista.filter(item => diasPassados(item.data_inicio) <= diasMax)

    const total = filtrados.reduce((acc, item) => acc + Number(item.valor_total), 0)

    return {
      quantidade: filtrados.length,
      total: total
    }
  }


  const resumo1 = resumoPeriodo(transacoes, 30)
  const resumo3 = resumoPeriodo(transacoes, 90)
  const resumo5 = resumoPeriodo(transacoes, 150)

  function filtrar(lista) {
    if (filtro === "todos") return lista

    let dias = 0
    if (filtro === "1m") dias = 30
    if (filtro === "3m") dias = 90
    if (filtro === "5m") dias = 150

    return lista.filter(item => diasPassados(item.data_inicio) <= dias)
  }

  const listaFiltrada = filtrar(transacoes)

  return (
    <div className='controleFinanceiro-container'>

      <Navbar2 />

      <div className='transacoes-controleFinanceiro'>

        <div className='titulo-controleFinaceiro'>
          <h1>Controle Financeiro</h1>
        </div>

   
        <div className='informacoes-controleFinanceiro'>
          {listaFiltrada.length === 0 ? (
            <p>Nenhuma movimentação encontrada.</p>
          ) : (
            listaFiltrada.map(item => (
              <ExtratoCard
                key={item.id_aluguel}
                nome_item={item.nome_item}
                valor_total={Number(item.valor_total)}
                data_inicio={item.data_inicio}
                data_fim={item.data_fim}
                rua_item={item.rua_item}
              />
            ))
          )}
        </div>

        <div className="extrato-footer">
          <h3>Gastos Totais</h3>

          <div className="totais-container">

            <div className="box-total">
              1 mês:
              <span>
                {resumo1.quantidade} {resumo1.quantidade === 1 ? 'item' : 'itens'} — 
                R$ {resumo1.total.toFixed(2)}
              </span>
            </div>

            <div className="box-total">
              3 meses:
              <span>
                {resumo3.quantidade} {resumo3.quantidade === 1 ? 'item' : 'itens'} — 
                R$ {resumo3.total.toFixed(2)}
              </span>
            </div>

            <div className="box-total">
              5 meses:
              <span>
                {resumo5.quantidade} {resumo5.quantidade === 1 ? 'item' : 'itens'} — 
                R$ {resumo5.total.toFixed(2)}
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default ControleFinanceiro
