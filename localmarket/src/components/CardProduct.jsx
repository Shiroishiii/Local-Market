import './CardProduct.css';

function CardProduct({ produto }) {
    return (
        <div className='card-product'>
            <div className='image-product'>
                <img className='img-card' src="/img/produto.png" alt="Avaliação" />
            </div>
            <div className='info-product'>
                <h3 className='name-product'>{produto.titulo}</h3>
                <p className='description-product'>{produto.descricao}</p>

                <div className='info-seller'>
                    <span className='name-seller'>
                        <img src="/img/user.svg" alt="Foto de perfil" />
                        {produto.usuario_nome || "Usuário"}
                    </span>
                    <span className='location-seller'>
                        <img src="/img/local-black.svg" alt="Localização" />
                        {produto.rua}, {produto.bairro} - {produto.cidade}
                    </span>
                </div>

                <div className='footer-product'>
                    <span className='price-product'>R$ {produto.preco_diaria}</span>
                </div>
            </div>
        </div>
    );
}

export default CardProduct;
