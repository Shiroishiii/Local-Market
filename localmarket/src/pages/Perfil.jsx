import React from 'react'
import './Perfil.css'


function Perfil() {
  return (
    <div className='perfil-container'>
      <div className='sidebar-container'>
        <h1 className='title'>LOCAL <span className='title-highlight'>MARKET</span></h1>
        <div className='sidebar-options'>
          <button className='button-sidebar'><p>Histórico de transações</p>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </button>
          <button className='button-sidebar'><p>Registro Financeiro</p>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path></button>
          <button className='button-sidebar'><p>Carrinho</p>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path></button>
          <button className='button-sidebar'><p>Favoritos</p>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path></button>
          <button className='button-sidebar'><p>Ajuda/Suporte</p>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path></button>
          <button className='button-sidebar'><p>Configuração</p>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path></button>
          <button className='button-logout'><p>Sair</p>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </button>
        </div>
      </div>
      <div className='central'>
        <button className='button-edit'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffffff" viewBox="0 0 256 256"><path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path></svg>
        </button>
        <img className='info-perfil' src="" alt="" />
        <h2 className='info'>Rodrigo Costa</h2>
        <h3 className='info'> rodrigocosta@gmail.com</h3>
      </div>

    </div>

  )
}

export default Perfil
