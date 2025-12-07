import './Carrinho.css';
import Navbar2 from '../components/Navbar2';
import CardProduct from '../components/CardProduct';
import { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';

function Carrinho() {
  const { produtosCarrinho, removerCarrinho, limparCarrinho } = useContext(GlobalContext);
  const navigate = useNavigate();

  // Calculando o preço total
  const totalPreco = produtosCarrinho.reduce((acc, produto) => acc + parseFloat(produto.preco_diaria), 0);

  // Função para navegar para a página de pagamento
  function navegarParaPagamento() {
    if (produtosCarrinho.length > 0) {
      // Passando todos os produtos para a página de pagamento
      navigate('/pagamento', { state: { produtos: produtosCarrinho } });
    } else {
      console.error("Carrinho vazio!");
    }
  }


  return (
    <div>
      <Navbar2 />
      <div className='carrinho-container'>
        <div className='cart-form'>
          <h1>Carrinho</h1>

          {/* Renderizando os produtos do carrinho */}
          {produtosCarrinho.map((produto) => (
            <div key={produto.id_item}>
              <CardProduct produto={produto} />

              {/* Botão para remover um produto específico */}
              <button
                className="button-remover"
                onClick={() => removerCarrinho(produto.id_item)}
              >
                Remover do Carrinho
              </button>
            </div>
          ))}

          <hr />
          {/* Exibindo a quantidade de produtos e o preço total formatado */}
          <p className='qntd-container'>
            Produtos ({produtosCarrinho.length}) <span className='preco-container'>R$ {totalPreco.toFixed(2)}</span>
          </p>

          {/* Botão para limpar todo o carrinho */}
          <button
            className='button-limpar'
            onClick={limparCarrinho}
          >
            Limpar Carrinho
          </button>

          <button className='button-alugar' onClick={navegarParaPagamento}>Alugar</button>
        </div>
      </div>
    </div>
  );
}

export default Carrinho;
