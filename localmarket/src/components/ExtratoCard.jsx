import React from 'react'
import './ExtratoCard.css'
function CardExtrato({ nome_item, rua_item, data_inicio, data_fim, valor_total }) {
  return (
    <div className="card-extrato">
      <div>
        <strong>{nome_item}</strong>
        <strong>{rua_item}</strong>
      </div>
        <p>{data_inicio}</p>
        <p>{data_fim}</p>

      <span className={valor_total < 0 ? 'negativo' : 'positivo'}>
        R$ {valor_total.toFixed(2)}
      </span>
    </div>
  );
}

export default CardExtrato;