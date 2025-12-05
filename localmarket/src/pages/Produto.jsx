import './Produto.css'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'


function Produto() {
    const { id } = useParams()
    const [produto, setProduto] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:3001/produtos/${id}`)
        .then(res => res.json())
        .then(dados => setProduto(dados))
        .then(err => console.log(err))
    }, [id])

    if(!produto) {
        return <p>Carregando...</p>
    }

    return (
        <div>
            <Navbar />
            <div className='product-body'>
                <div className='product-container'>
                    <div className='image-container'>
                        <img className='img' src="./img/produto.png" alt="" />
                    </div>
                    <div className='product-information'>
                        <h1 className='nome-produto'>{produto.titulo}</h1>
                        <p className='desc-produto'>{produto.descricao}</p>
                        <div className='info-locador'>
                            <span className='nome-locador'><img src="./img/user.svg" alt="Foto de perfil" />Joao</span>
                            <span className='localizacao-locador'><img src="./img/local-black.svg" alt="Localização" />{produto.cidade}, {produto.bairro}, {produto.rua}</span>
                        </div>
                        <h1 className='preco-produto'>{produto.preco_diaria}</h1>
                        <button className='btn-produto'>Alugar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Produto