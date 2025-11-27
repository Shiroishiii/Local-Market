import './Navbar.css'
import React, { useContext } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'
import { Link } from 'react-router-dom'
import InfoCep from './InfoCep'


function Navbar() {
  const { isSidebarOpen, setIsSidebarOpen, toggleSidebar } = useContext(GlobalContext)
  //   const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen)
  // }

  const { cepCepado, setCepCepado } = useContext(GlobalContext)
  return (






    <div className='navbar-container'>
      <nav className='nav-container'>
        <Link to={'/'}></Link>


      </nav>

      <div className='navbar-left'>
        <img className='logoNav' src="./img/LogoAtu.svg" alt="" />
        <h3 className='span-local'>LOCAL <span className='span-market'> MARKET</span></h3>
        <div className='location-section'>
          <img className='icon-local' src="./img/local.svg" alt="Localização" />
          <InfoCep />
        </div>
      </div>

      <div className='navbar-center'>
        <div className='search-container'>
          <input type="text" className='input-container' placeholder='Buscar por: item, categoria, vendedor' />
          <div className='search-icon'>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <button onClick={toggleSidebar} className='filters-btn'>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M14 12v7.88c.04.3-.06.62-.29.83a.996.996 0 0 1-1.41 0l-2.01-2.01a.99.99 0 0 1-.29-.83V12h-.03L4.21 4.62a1 1 0 0 1 .17-1.4c.19-.14.4-.22.62-.22h14c.22 0 .43.08.62.22a1 1 0 0 1 .17 1.4L14.03 12z" /></svg>
        </button>
      </div>
      <div className='navbar-right'>
<<<<<<< HEAD
      <Link to="/anunciar">
        <button className='anunciar'>Anunciar</button>
        </Link>
=======
      <Link to = {'/anunciar'}> <button className='btn-anunciar-border'>Anuncie seu produto</button></Link>
>>>>>>> 40104e3ef76e0bb90d802472ee30070f8cadd99d
        <div className='profile-section'>
          <Link to={'/perfil'}><img className='profile-pic' src="./img/user.png" alt="Foto de perfil" /> </Link>
          <button className='cart-button'>
            <Link to = {'/carrinho'}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16"><path fill="white" d="M14 13.1V12H4.6l.6-1.1l9.2-.9L16 4H3.7L3 1H0v1h2.2l2.1 8.4L3 13v1.5c0 .8.7 1.5 1.5 1.5S6 15.3 6 14.5S5.3 13 4.5 13H12v1.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0-.7-.4-1.2-1-1.4" />
            </svg> </Link>
          </button>
          {/* <div className='chat-icon'>
            
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Navbar