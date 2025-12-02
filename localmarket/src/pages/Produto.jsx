import './Produto.css'
import Navbar from '../components/Navbar'

function Produto() {
    const produto = {
        nome: 'Teclado Gamer',
        preco: 99.90,
        desc: 'lorem ipsksamoamcaimmsamocmasmcsacoinaiscnnascoinancoa',
        imagem: './img/produto.png'
    }

    return (
        <div>
            <Navbar />
            <div className='produto-page'>
                <div className='produto-card'>
                    <div className='produto-img'>
                        <img src={produto.imagem} alt={produto.nome} />
                    </div>
                    <div className='prouto-info'>
                        <h1>{produto.nome}</h1>
                        <p className='descricao'>{produto.desc}</p>
                        <span className='preco'>
                            R$: {produto.preco}
                        </span>
                        <button className='btn-alug'>
                            Alugar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Produto