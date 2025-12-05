import React from 'react'
import './ExtratoCard.css'

function CardExtrato({ nome_item, rua_item, data_inicio, data_fim, valor_total }) {


  function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR')
  }

  return (
    <div className="card-extrato">


      <div className="col-esquerda">
        <p className="nome">{nome_item}</p>
        <p className="local">{rua_item}</p>
      </div>


      <div className="col-meio">
      <label htmlFor="">Inicio</label> 
       <p className="data">{formatarData(data_inicio)}</p>
      <label htmlFor="">Fim</label>
       <p className="data">{formatarData(data_fim)}</p>
      </div>

      <div className="col-direita">
        <p className={`valor ${valor_total < 0 ? 'negativo' : 'positivo'}`}>
          R$ {valor_total.toFixed(2)}
        </p>
      </div>

    </div>
  )
}

export default CardExtrato