import './Produto.css'
import Navbar from '../components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'
import { useContext } from 'react'


function Produto() {
    const { id } = useParams()
    const [produto, setProduto] = useState(null)
    const navigate = useNavigate()

    const { adicionarCarrinho } = useContext(GlobalContext)

    useEffect(() => {
        const buscarProduto = async () => {
            try {
                // Buscando o produto
                const resItem = await fetch(`http://localhost:3001/item/${id}`);
                const dados = await resItem.json();
                
                // Buscando o nome do usuário
                if (dados.usuario_id) {
                    const resUser = await fetch(`http://localhost:3001/usuario/${dados.usuario_id}`);
                    const usuario = await resUser.json();
                    // Adicionando o nome do usuário ao produto
                    setProduto({ ...dados, usuario_nome: usuario.nome });
                } else {
                    setProduto(dados);
                }
            } catch (err) {
                console.log(err);
            }
        };
        
        buscarProduto();
    }, [id])

    if(!produto) {
        return <p>Carregando...</p>
    }

    function abrirPagamento(){
        // Enviando o produto completo em um array para a página de pagamento
        navigate('/pagamento', { state: { produtos: [produto] } })
    }

    function AdicionarAoCarrinho() {
        adicionarCarrinho(produto)
        navigate('/carrinho')
    }

    return (
        <div>
            <Navbar />
            <div className='product-body'>
                <div className='product-container'>
                    <div className='image-container'>
                        <img className='img' src="/img/produto.png" alt="" />
                    </div>
                    <div className='product-information'>
                        <h1 className='nome-produto'>{produto.titulo}</h1>
                        <p className='desc-produto'>{produto.descricao}</p>
                        <div className='info-locador'>
                            <span className='nome-locador'><img src="/img/user.svg" alt="Foto de perfil" />Joao</span>
                            <span className='localizacao-locador'><img src="/img/local-black.svg" alt="Localização" />{produto.cidade}, {produto.bairro}, {produto.rua}</span>
                        </div>
                        <h1 className='preco-produto'>R$ {produto.preco_diaria}</h1>
                        <button className='btn-produto' onClick={abrirPagamento}>Alugar</button>
                        <button className='btn-produto' onClick={AdicionarAoCarrinho}>Adicionar ao Carrinho</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Produto