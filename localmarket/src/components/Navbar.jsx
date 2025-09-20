import React from 'react'
import './Navbar.css'

function Navbar() {
  return (

    <div className='navbar-container'>
        
        <h1>LOCAL<span className='span-market'>MARKET</span></h1>
        <img className='icon-especial' src="./img/logo.png" />
        <p><img src="./img/contact.svg" className='icon-container'/>Contato</p>
        <p><img src="./img/home.svg" className='icon-container'/>Home</p>
      
        <label htmlFor=""> </label>
        <input type="text" className='input-container' placeholder = 'Buscar por: produto, vendedor'
        
        />

        </div>
        
  )
}

export default Navbar