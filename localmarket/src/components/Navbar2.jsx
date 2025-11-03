import './Navbar2.css'

function Navbar2() {
  return (
    <div className='Navbar-container'>
        <div className='navbar-left'>
            <img className='logoNav' src="./img/LogoAtu.svg" alt="" />
        </div>
        <div className='navbar-center'>
            <h1>Local Market</h1>
        </div>
        <div className='navbar-spacer'></div>
    </div>
  )
}

export default Navbar2