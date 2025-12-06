import { useLocation } from 'react-router-dom';  // Adicione esta linha
import { useState } from 'react';
import './Pagamento.css';
import Navbar2 from '../components/Navbar2';
import CardProduct from '../components/CardProduct';


function Pagamento() {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const location = useLocation();

    const { produtos } = location.state || {};

    if (!produtos || produtos.length === 0) {
        return <p>Produtos não encontrados.</p>;
    }

    const totalPreco = produtos.reduce((acc, produto) => acc + parseFloat(produto.preco_diaria), 0);

    // Validação dos campos
    const validarCampos = () => {
        if (!nome || !cpf || !email || !telefone) {
            setModalMessage('Por favor, preencha todos os campos!');
            setShowModal(true);
            return false;
        }
        return true;
    };

    // Função de submissão
    const concluirPagamento = () => {
        if (validarCampos()) {
            setModalMessage('Pagamento concluído com sucesso!');
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <Navbar2 />
            <div className="pag-container">
                <div className="pagamento-container">
                    <h2>Pagamento</h2>
                    <hr />
                    <h2>Dados pessoais</h2>
                    <div className="dados-form">
                        <label htmlFor="">
                            Nome
                            <input
                                type="text"
                                placeholder="Digite seu nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </label>
                        <label htmlFor="">
                            CPF
                            <input
                                type="text"
                                placeholder="000.000.000-00"
                                maxLength={14}
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                            />
                        </label>
                        <label htmlFor="">
                            Email
                            <input
                                type="email"
                                placeholder="Digite seu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <label htmlFor="">
                            Telefone
                            <input
                                type="tel"
                                placeholder="(11) 99999-9999"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                            />
                        </label>
                    </div>
                    <hr />
                    <h2>Formas de pagamento</h2>
                    <div className='payment-container'>
                        <button className='button-payment'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="#32BCAD" d="m15.45 16.52l-3.01-3.01c-.11-.11-.24-.13-.31-.13s-.2.02-.31.13L8.8 16.53c-.34.34-.87.89-2.64.89l3.71 3.7a3 3 0 0 0 4.24 0l3.72-3.71c-.91 0-1.67-.18-2.38-.89M8.8 7.47l3.02 3.02c.08.08.2.13.31.13s.23-.05.31-.13l2.99-2.99c.71-.74 1.52-.91 2.43-.91l-3.72-3.71a3 3 0 0 0-4.24 0l-3.71 3.7c1.76 0 2.3.58 2.61.89" /><path fill="#32BCAD" d="m21.11 9.85l-2.25-2.26H17.6c-.54 0-1.08.22-1.45.61l-3 3c-.28.28-.65.42-1.02.42a1.5 1.5 0 0 1-1.02-.42L8.09 8.17c-.38-.38-.9-.6-1.45-.6H5.17l-2.29 2.3a3 3 0 0 0 0 4.24l2.29 2.3h1.48c.54 0 1.06-.22 1.45-.6l3.02-3.02c.28-.28.65-.42 1.02-.42s.74.14 1.02.42l3.01 3.01c.38.38.9.6 1.45.6h1.26l2.25-2.26a3.04 3.04 0 0 0-.02-4.29" /></svg>
                            Pix
                        </button>
                        <button className='button-payment'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 128 128"><path fill="#ec8f03ff" d="M116.34 101.95H11.67c-4.2 0-7.63-3.43-7.63-7.63V33.68c0-4.2 3.43-7.63 7.63-7.63h104.67c4.2 0 7.63 3.43 7.63 7.63v60.64c0 4.2-3.43 7.63-7.63 7.63" /><path fill="#424242" d="M4.03 38.88h119.95v16.07H4.03z" /><path fill="#fff" d="M114.2 74.14H13.87c-.98 0-1.79-.8-1.79-1.79v-8.41c0-.98.8-1.79 1.79-1.79H114.2c.98 0 1.79.8 1.79 1.79v8.41c-.01.98-.81 1.79-1.79 1.79" /><path fill="none" stroke="#424242" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M23.98 70.49c.56-1.08.71-2.34 1.21-3.45s1.59-2.14 2.79-1.95c1.11.18 1.8 1.29 2.21 2.33c.57 1.45.88 3 .92 4.56c.01.32-.01.67-.22.92c-.37.42-1.13.21-1.42-.27s-.22-1.09-.09-1.64c.62-2.55 2.62-4.72 5.11-5.54c.26-.09.53-.16.8-.11c.58.11.9.71 1.16 1.23c.61 1.19 1.35 2.32 2.2 3.35c.34.42.73.83 1.25.99c1.71.5 2.7-2.02 4.35-2.69c1.98-.8 3.91 1.29 6.01 1.68c3.07.57 4.7-1.82 7.39-2.43c.36-.08.75-.13 1.11-.03c.66.19 1.07.82 1.46 1.39c.91 1.34 2.21 2.66 3.83 2.67c1.03.01 1.98-.52 2.92-.97c3.33-1.59 7.26-2.25 10.74-1.03" /></svg>
                            Cartão de Débito
                        </button>
                        <button className='button-payment'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 128 128"><path fill="#ffc107" d="M116.34 101.95H11.67c-4.2 0-7.63-3.43-7.63-7.63V33.68c0-4.2 3.43-7.63 7.63-7.63h104.67c4.2 0 7.63 3.43 7.63 7.63v60.64c0 4.2-3.43 7.63-7.63 7.63" /><path fill="#424242" d="M4.03 38.88h119.95v16.07H4.03z" /><path fill="#fff" d="M114.2 74.14H13.87c-.98 0-1.79-.8-1.79-1.79v-8.41c0-.98.8-1.79 1.79-1.79H114.2c.98 0 1.79.8 1.79 1.79v8.41c-.01.98-.81 1.79-1.79 1.79" /><path fill="none" stroke="#424242" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M23.98 70.49c.56-1.08.71-2.34 1.21-3.45s1.59-2.14 2.79-1.95c1.11.18 1.8 1.29 2.21 2.33c.57 1.45.88 3 .92 4.56c.01.32-.01.67-.22.92c-.37.42-1.13.21-1.42-.27s-.22-1.09-.09-1.64c.62-2.55 2.62-4.72 5.11-5.54c.26-.09.53-.16.8-.11c.58.11.9.71 1.16 1.23c.61 1.19 1.35 2.32 2.2 3.35c.34.42.73.83 1.25.99c1.71.5 2.7-2.02 4.35-2.69c1.98-.8 3.91 1.29 6.01 1.68c3.07.57 4.7-1.82 7.39-2.43c.36-.08.75-.13 1.11-.03c.66.19 1.07.82 1.46 1.39c.91 1.34 2.21 2.66 3.83 2.67c1.03.01 1.98-.52 2.92-.97c3.33-1.59 7.26-2.25 10.74-1.03" /></svg>
                            Cartão de Crédito
                        </button>

                    </div>
                    <button className="button-location" onClick={concluirPagamento}>Alugar</button>
                </div>

                <div className="resumo-container">
                    <h2>Resumo de locação</h2>
                    <hr />
                    <div className="info-location">
                        {produtos.map((produto, index) => (
                            <CardProduct key={index} produto={produto} />
                        ))}
                    </div>
                    <h2 className="subtotal-container">
                        Subtotal: <span className="price-container">R$ {totalPreco.toFixed(2)}</span>
                    </h2>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={(e) => {
                    if (e.target === e.currentTarget) closeModal();
                }}>
                    <div className="modal-container">
                        <h3>{modalMessage}</h3>
                        <button onClick={closeModal} className="button-close-modal">Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Pagamento;
