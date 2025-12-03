import './Produto.css'
import Navbar from '../components/Navbar'

function Produto() {


    return (
        <div>
            <Navbar />
            <div className='product-body'>
                <div className='product-container'>
                    <div className='image-container'>
                        <img className='img' src="./img/produto.png" alt="" />
                    </div>
                    <div className='product-information'>
                        <h1 className='nome-produto'>Nome Produto</h1>
                        <p className='desc-produto'>Descrição: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo aliquam sit odio laborum laudantium rem, quod eaque beatae quis illo harum quam accusantium id ipsum, est aspernatur temporibus in minima.</p>
                        <div className='info-locador'>
                            <span className='nome-locador'><img src="./img/user.svg" alt="Foto de perfil" />Joao</span>
                            <span className='localizacao-locador'><img src="./img/local-black.svg" alt="Localização" />Rua foda amno</span>
                        </div>
                        <h1 className='preco-produto'>R$ 145,90</h1>
                        <p className='estoque-produto'>Estoque: Disponível</p>
                        <button className='btn-produto'>Alugar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Produto