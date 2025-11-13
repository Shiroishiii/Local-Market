import './CardProduct.css'

function CardProduct() {
    return (
        <div className='card-product'>
            <div className='image-product'>
            <img className='img-card' src="./img/produto.png" alt="Avaliação" />
            </div>
            <div className='info-product'>
                <h3 className='name-product'>Nome produto</h3>
                <p className='description-product'>descricao: Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, dolorem? Excepturi eum perspiciatis veniam architecto recusandae quos debitis, ut laborum ad consequatur, labore omnis eaque culpa provident officiis! Earum, quisquam.</p>

                <div className='info-seller'>
                    <span className='name-seller'><img src="./img/user.svg" alt="Foto de perfil" />Joao</span>
                    <span className='location-seller'><img src="./img/local-black.svg" alt="Localização" />Rua foda amno</span>
                </div>

                <div className='footer-product'>
                    <span className='price-product'>R$ 30/dia</span>
                </div>
            </div>
        </div>
    )
}

export default CardProduct