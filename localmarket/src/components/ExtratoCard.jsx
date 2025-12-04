import React from 'react'
import './ExtratoCard.css'
function CardExtrato({ descricao, valor, data }) {
  return (
    <div className="card-extrato">
      <div>
        <strong>{descricao}</strong>
      </div>
        <p>{data}</p>

      <span className={valor < 0 ? 'negativo' : 'positivo'}>
        R$ {valor.toFixed(2)}
      </span>
    </div>
  );
}

export default CardExtrato;