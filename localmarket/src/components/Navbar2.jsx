import './Navbar2.css'
import { GlobalContext } from '../contexts/GlobalContext'
import { Link } from 'react-router-dom'

function Navbar2() {
  return (
    <div className='Navbar-container'>
      <div className='navbar-left-2'>
        <img className='logoNav' src="./img/LogoAtu.svg" alt="" />
        <h3>LOCAL<span className='span-market'>MARKET</span></h3>
      </div>
      <div className='navbar-center-2'>
      </div>
      <div className='navbar-right-2'>
        <div className='profile-section'>
          <Link to={'/perfil'}><img className='profile-pic' src="./img/user.png" alt="Foto de perfil" /> </Link>
          <button className='cart-button'>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16"><path fill="currentColor" d="M14 13.1V12H4.6l.6-1.1l9.2-.9L16 4H3.7L3 1H0v1h2.2l2.1 8.4L3 13v1.5c0 .8.7 1.5 1.5 1.5S6 15.3 6 14.5S5.3 13 4.5 13H12v1.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0-.7-.4-1.2-1-1.4" />
            </svg>
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

export default Navbar2