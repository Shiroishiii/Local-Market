import React from 'react'
import './ProductCard.css'

function ProductCard({ product }) {
  const {
    id,
    name,
    price,
    image,
    seller,
    location,
    rating,
    description
  } = product

  return (
    <div className='product-card'>
      <div className='product-image-container'>
        {/* <img 
          src={image || './img/LogoAtu.svg'} 
          alt={name}
          className='product-image'
        /> */}
        <img className='card-img' src="./img/produto.png" alt="Avaliação" />  {rating || '4.5'}
      </div>
      
      <div className='product-info'>
        <h3 className='product-name'>{name}</h3>
        <p className='product-description'>{description}</p>
        
        <div className='seller-info'>
          <span className='seller-name'><img src="./img/user.svg" alt="Foto de perfil" /> {seller}</span>
          <span className='seller-location'><img src="./img/local-black.svg" alt="Localização" /> {location}</span>
        </div>
        
        <div className='product-footer'>
          <span className='product-price'>R$ {price}/dia</span>
          <button className='contact-button'>Alugar agora</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
