import './Carrinho.css'
import Navbar2 from '../components/Navbar2'
import CardProduct from '../components/CardProduct'

function Carrinho() {
  return (
    <div>
      <Navbar2 />
      <div className='carrinho-container'>
        <div className='cart-form'>
          <h1>Carrinho</h1>
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <hr />
          <p className='qntd-container'>Produtos(3) <span className='preco-container'>R$ 8 345,59</span></p>
          <button className='button-alugar'>Alugar</button>
        </div>
      </div>
    </div>
  )
}

export default Carrinho