import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import './Pagamento.css';
import Navbar2 from '../components/Navbar2';
import CardProduct from '../components/CardProduct';
import { GlobalContext } from '../contexts/GlobalContext';

function Pagamento() {
  const location = useLocation();
  const navigate = useNavigate();
  const { produtos } = location.state || {}; // Pegando todos os produtos
  const { usuarioLogado } = useContext(GlobalContext);

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('');
  const [quantidadeDias, setQuantidadeDias] = useState(1);

  // Verificando se a lista de produtos não está vazia
  if (!produtos || produtos.length === 0) {
    return <p>Nenhum produto encontrado. Por favor, adicione ao carrinho antes de prosseguir.</p>;
  }

  // Calculando o preço total de todos os produtos (preco_diaria * quantidade de dias)
  const totalPreco = produtos.reduce((acc, produto) => acc + (parseFloat(produto.preco_diaria) * quantidadeDias), 0);

  // Função para validar os campos do formulário
  const validarCampos = () => {
    if (!nome || !cpf || !email || !telefone) {
      setModalMessage('Por favor, preencha todos os campos!');
      setShowModal(true);
      return false;
    }
    
    // Validar CPF: deve ter 11 dígitos
    const cpfNumeros = cpf.replace(/\D/g, '');
    if (cpfNumeros.length !== 11) {
      setModalMessage('Por favor, insira um CPF válido! (11 dígitos)');
      setShowModal(true);
      return false;
    }

    // Validar email
    if (!validarEmail(email)) {
      setModalMessage('Por favor, insira um email válido!');
      setShowModal(true);
      return false;
    }

    // Validar telefone: deve ter pelo menos 10 dígitos (formato completo)
    const telefoneNumeros = telefone.replace(/\D/g, '');
    if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
      setModalMessage('Por favor, insira um telefone válido! (10 ou 11 dígitos)');
      setShowModal(true);
      return false;
    }
    
    if (quantidadeDias < 1 || quantidadeDias > 365) {
      setModalMessage('A quantidade de dias deve ser entre 1 e 365!');
      setShowModal(true);
      return false;
    }
    return true;
  };

  // Função para concluir o pagamento
  const concluirPagamento = async () => {
    if (!validarCampos()) {
      return;
    }

    if (!formaPagamento) {
      setModalMessage('Por favor, selecione uma forma de pagamento!');
      setShowModal(true);
      return;
    }

    if (!usuarioLogado?.id_usuario) {
      setModalMessage('Você precisa estar logado para realizar o pagamento!');
      setShowModal(true);
      return;
    }

    try {
      // Criar aluguel para cada produto
      for (const produto of produtos) {
        const dataInicio = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const dataFim = new Date(Date.now() + quantidadeDias * 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' '); // quantidade de dias depois
        const valorTotal = parseFloat(produto.preco_diaria) * quantidadeDias; // Valor da diária * quantidade de dias

        // Criar aluguel
        const resAluguel = await fetch('http://localhost:3001/aluguel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data_inicio: dataInicio,
            data_fim: dataFim,
            valor_total: valorTotal,
            usuario_id: usuarioLogado.id_usuario,
            item_id: produto.id_item
          })
        });

        if (!resAluguel.ok) {
          throw new Error('Erro ao criar aluguel');
        }

        const aluguel = await resAluguel.json();

        // Criar pagamento associado ao aluguel
        const dataPagamento = new Date().toISOString().slice(0, 19).replace('T', ' ');
        await fetch('http://localhost:3001/pagamento', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data_pagamento: dataPagamento,
            valor: valorTotal,
            forma_pagamento: formaPagamento,
            status_pagamento: 'Pagamento realizado',
            aluguel_id: aluguel.id_aluguel
          })
        });
      }

      setModalMessage('Pagamento concluído com sucesso!');
      setShowModal(true);
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        navigate('/controleFinanceiro');
      }, 2000);
    } catch (err) {
      console.error('Erro ao processar pagamento:', err);
      setModalMessage('Erro ao processar pagamento. Tente novamente.');
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Função para formatar CPF: XXX.XXX.XXX-XX
  const formatarCPF = (valor) => {
    const apenasNumeros = valor.replace(/\D/g, '');
    const numerosLimitados = apenasNumeros.slice(0, 11);
    
    if (numerosLimitados.length <= 3) {
      return numerosLimitados;
    } else if (numerosLimitados.length <= 6) {
      return `${numerosLimitados.slice(0, 3)}.${numerosLimitados.slice(3)}`;
    } else if (numerosLimitados.length <= 9) {
      return `${numerosLimitados.slice(0, 3)}.${numerosLimitados.slice(3, 6)}.${numerosLimitados.slice(6)}`;
    } else {
      return `${numerosLimitados.slice(0, 3)}.${numerosLimitados.slice(3, 6)}.${numerosLimitados.slice(6, 9)}-${numerosLimitados.slice(9)}`;
    }
  };

  const handleCPFChange = (e) => {
    const valorFormatado = formatarCPF(e.target.value);
    setCpf(valorFormatado);
  };

  // Função para formatar telefone: (XX) XXXXX-XXXX
  const formatarTelefone = (valor) => {
    const apenasNumeros = valor.replace(/\D/g, '');
    const numerosLimitados = apenasNumeros.slice(0, 11);
    
    if (numerosLimitados.length <= 2) {
      return numerosLimitados;
    } else if (numerosLimitados.length <= 7) {
      return `(${numerosLimitados.slice(0, 2)}) ${numerosLimitados.slice(2)}`;
    } else {
      return `(${numerosLimitados.slice(0, 2)}) ${numerosLimitados.slice(2, 7)}-${numerosLimitados.slice(7)}`;
    }
  };

  const handleTelefoneChange = (e) => {
    const valorFormatado = formatarTelefone(e.target.value);
    setTelefone(valorFormatado);
  };

  // Função para validar email
  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const valor = e.target.value;
    setEmail(valor);
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
            <label>
              Nome
              <input
                type="text"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </label>
            <label>
              CPF
              <input
                type="text"
                placeholder="000.000.000-00"
                maxLength={14}
                value={cpf}
                onChange={handleCPFChange}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={handleEmailChange}
              />
            </label>
            <label>
              Telefone
              <input
                type="tel"
                placeholder="(11) 99999-9999"
                value={telefone}
                onChange={handleTelefoneChange}
                maxLength={15}
              />
            </label>
            <label>
              Quantidade de dias
              <input
                type="number"
                placeholder="Digite a quantidade de dias"
                min="1"
                max="365"
                value={quantidadeDias}
                onChange={(e) => {
                  const dias = parseInt(e.target.value) || 1;
                  if (dias >= 1 && dias <= 365) {
                    setQuantidadeDias(dias);
                  }
                }}
              />
            </label>
          </div>
          <hr />
          <h2>Formas de pagamento</h2>
          <div className='payment-container'>
            <button 
              className={`button-payment ${formaPagamento === 'Pix' ? 'selected' : ''}`}
              onClick={() => setFormaPagamento('Pix')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="#32BCAD" d="m15.45 16.52l-3.01-3.01c-.11-.11-.24-.13-.31-.13s-.2.02-.31.13L8.8 16.53c-.34.34-.87.89-2.64.89l3.71 3.7a3 3 0 0 0 4.24 0l3.72-3.71c-.91 0-1.67-.18-2.38-.89M8.8 7.47l3.02 3.02c.08.08.2.13.31.13s.23-.05.31-.13l2.99-2.99c.71-.74 1.52-.91 2.43-.91l-3.72-3.71a3 3 0 0 0-4.24 0l-3.71 3.7c1.76 0 2.3.58 2.61.89" /><path fill="#32BCAD" d="m21.11 9.85l-2.25-2.26H17.6c-.54 0-1.08.22-1.45.61l-3 3c-.28.28-.65.42-1.02.42a1.5 1.5 0 0 1-1.02-.42L8.09 8.17c-.38-.38-.9-.6-1.45-.6H5.17l-2.29 2.3a3 3 0 0 0 0 4.24l2.29 2.3h1.48c.54 0 1.06-.22 1.45-.6l3.02-3.02c.28-.28.65-.42 1.02-.42s.74.14 1.02.42l3.01 3.01c.38.38.9.6 1.45.6h1.26l2.25-2.26a3.04 3.04 0 0 0-.02-4.29" /></svg>
              Pix
            </button>
            <button 
              className={`button-payment ${formaPagamento === 'Débito' ? 'selected' : ''}`}
              onClick={() => setFormaPagamento('Débito')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 128 128"><path fill="#ec8f03ff" d="M116.34 101.95H11.67c-4.2 0-7.63-3.43-7.63-7.63V33.68c0-4.2 3.43-7.63 7.63-7.63h104.67c4.2 0 7.63 3.43 7.63 7.63v60.64c0 4.2-3.43 7.63-7.63 7.63" /><path fill="#424242" d="M4.03 38.88h119.95v16.07H4.03z" /><path fill="#fff" d="M114.2 74.14H13.87c-.98 0-1.79-.8-1.79-1.79v-8.41c0-.98.8-1.79 1.79-1.79H114.2c.98 0 1.79.8 1.79 1.79v8.41c-.01.98-.81 1.79-1.79 1.79" /><path fill="none" stroke="#424242" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M23.98 70.49c.56-1.08.71-2.34 1.21-3.45s1.59-2.14 2.79-1.95c1.11.18 1.8 1.29 2.21 2.33c.57 1.45.88 3 .92 4.56c.01.32-.01.67-.22.92c-.37.42-1.13.21-1.42-.27s-.22-1.09-.09-1.64c.62-2.55 2.62-4.72 5.11-5.54c.26-.09.53-.16.8-.11c.58.11.9.71 1.16 1.23c.61 1.19 1.35 2.32 2.2 3.35c.34.42.73.83 1.25.99c1.71.5 2.7-2.02 4.35-2.69c1.98-.8 3.91 1.29 6.01 1.68c3.07.57 4.7-1.82 7.39-2.43c.36-.08.75-.13 1.11-.03c.66.19 1.07.82 1.46 1.39c.91 1.34 2.21 2.66 3.83 2.67c1.03.01 1.98-.52 2.92-.97c3.33-1.59 7.26-2.25 10.74-1.03" /></svg>
              Cartão de Débito
            </button>
            <button 
              className={`button-payment ${formaPagamento === 'Crédito' ? 'selected' : ''}`}
              onClick={() => setFormaPagamento('Crédito')}
            >
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
            {/* Exibindo todos os produtos do carrinho */}
            {produtos.map((produto) => (
              <CardProduct key={produto.id_item} produto={produto} />
            ))}
          </div>
          <h2 className="subtotal-container">
            <div style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>
              {quantidadeDias} {quantidadeDias === 1 ? 'dia' : 'dias'} de aluguel
            </div>
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
