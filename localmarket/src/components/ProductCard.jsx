import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {

  const navigate = useNavigate();

  function abrirProduto(){
    navigate(`/produto/${product.id_item}`)
  }

  return (
    <div className="product-card">
      {/* Container da imagem */}
      <div className="product-image-container">
        <img
          className="product-image"
          src= {'/img/produto.png'}
          alt={product.titulo}
        />
      </div>

      {/* Informações do produto */}
      <div className="product-info">
        <h3 className="product-name">{product.titulo}</h3>
        <p className="product-description">{product.descricao}</p>

        {/* Informações do vendedor */}
        <div className="info-seller">
          <span className="name-seller">
            <img src="/img/user.svg" alt="Foto do vendedor" />
            {product.usuario_nome || "Usuário"}
          </span>
          <span className="location-seller">
            <img src="/img/local-black.svg" alt="Localização" />
            {product.rua}, {product.bairro} - {product.cidade}
          </span>
        </div>

        {/* Footer com preço */}
        <div className="product-footer">
          <span className="product-price">R$ {product.preco_diaria}/dia</span>
          {/* Botão de contato opcional */}
          <button onClick={abrirProduto} className="alug-button">Alugar</button>
        </div>
      </div>
    </div>
  );
}
