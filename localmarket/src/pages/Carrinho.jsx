import './Carrinho.css'
import Navbar2 from '../components/Navbar2'

function Carrinho() {
  return (
    <div>
      <Navbar2 />
      <div className='carrinho-container'>
        <div className='cart-form'>
          <h1>Carrinho</h1>
        </div>
      </div>
    </div>
  )
}

export default Carrinho