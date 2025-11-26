import Navbar2 from '../components/Navbar2'
import './Pagamento.css'

function Pagamento() {
    return (
        <div>
            <Navbar2 />
            <div className='pag-container'>
                <div className='pagamento-container'>
                    <h2>Pagamento</h2><hr />
                        <h2>Dados pessoais</h2>
                    <div className='dados-form'>
                        <label htmlFor="">Nome
                            <input type="text" />
                        </label>
                        <label htmlFor="">CPF
                            <input type="text" />
                        </label>
                        <label htmlFor="">Email
                            <input type="text" />
                        </label>
                        <label htmlFor="">Telefone
                            <input type="text" />
                        </label>
                    </div>
                </div>
                <div className='resumo-container'>
                    <h2>Resumo de locação</h2><hr />

                </div>
            </div>
        </div>
    )
}

export default Pagamento