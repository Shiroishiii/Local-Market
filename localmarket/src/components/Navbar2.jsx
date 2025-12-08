import './Navbar2.css'
import { GlobalContext } from '../contexts/GlobalContext'
import { Link } from 'react-router-dom'

function Navbar2() {
  return (
    <div className='Navbar-container-2'>
      <div className='navbar-left-2'>
        <Link to={'/'}><img className='logoNav-2' src="./img/LogoAtu.svg" alt="" /></Link>
        <h3>LOCAL<span className='span-market'>MARKET</span></h3>
      </div>
      <div className='navbar-center-2'>
      </div>
      <div className='navbar-right-2'>
        <div className='profile-section'>
          <Link to={'/perfil'}><img className='profile-pic' src="./img/user.png" alt="Foto de perfil" /> </Link>
          <button className='cart-button'>
          <Link to={'/carrinho'}> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16"><path fill='white' d="M14 13.1V12H4.6l.6-1.1l9.2-.9L16 4H3.7L3 1H0v1h2.2l2.1 8.4L3 13v1.5c0 .8.7 1.5 1.5 1.5S6 15.3 6 14.5S5.3 13 4.5 13H12v1.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0-.7-.4-1.2-1-1.4" />
            </svg></Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar2