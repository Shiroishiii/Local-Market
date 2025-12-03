import React from "react";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const thumb =
    product.video ||
    (product.images && product.images[0]) ||
    product.image;

  return (
    <div className="product-card">
      {/* Mídia */}
      {product.video ? (
        <video className="product-thumb" src={product.video} controls />
      ) : (
        <img className="product-thumb" src={thumb} alt={product.name} />
      )}

      {/* Infos */}
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <strong>R$ {product.price}</strong>
        <span>{product.location}</span>
      </div>
    </div>
  );
}
