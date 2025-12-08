import React, { useState,useContext } from "react";
import "./Anunciar.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { GlobalContext } from '../contexts/GlobalContext';


export default function Anunciar() {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [preco, setPreco] = useState("");
    const [cidade, setCidade] = useState("");
    const [bairro, setBairro] = useState("");
    const [rua, setRua] = useState("")
    const [estado, setEstado] = useState("")
    const [cep, setCep] = useState("");
    const [telefone, setTelefone] = useState("");
    const [imagem, setImagem] = useState("");
    const [imagemPreview, setImagemPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const {usuarioLogado} = useContext(GlobalContext)
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');


    const  navigate = useNavigate()

    // Função para formatar CEP: XXXXX-XXX
    const formatarCEP = (valor) => {
        const apenasNumeros = valor.replace(/\D/g, '');
        const numerosLimitados = apenasNumeros.slice(0, 8);
        
        if (numerosLimitados.length <= 5) {
            return numerosLimitados;
        } else {
            return `${numerosLimitados.slice(0, 5)}-${numerosLimitados.slice(5)}`;
        }
    };

    const handleCEPChange = (e) => {
        const valorFormatado = formatarCEP(e.target.value);
        setCep(valorFormatado);
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

    // Buscar cidade e bairro pelo CEP
    const buscarCep = async (valor) => {
        const cepLimpo = valor.replace(/\D/g, '');
        setCep(formatarCEP(valor));
        
        if (cepLimpo.length === 8) {
            const req = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
            const data = await req.json();
            
            
            if (!data.erro) {
                setCidade(data.localidade);
                setBairro(data.bairro);
                setRua(data.logradouro)
                setEstado(data.uf)
            }
        }
    };
    
    // Imagens (máximo 1)
    const handleImagens = (e) => {
        const files = Array.from(e.target.files);
        
        if (files.length > 1) {
            setModalMessage("Você só pode enviar no máximo 1 imagem.");
            setShowModal(true);
            return;
        }
        
        if (files.length === 1) {
            const file = files[0];
            // Salvar nome do arquivo para enviar ao backend
            setImagem(file.name);
            
            // Criar preview da imagem
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagemPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    // Enviar item
    const enviarItem = async () => {
        // Validação básica
        if (!titulo || !descricao || !categoria || !preco) {
            setModalMessage("Por favor, preencha todos os campos obrigatórios!");
            setShowModal(true);
            return;
        }

        if (!usuarioLogado?.id_usuario) {
            setModalMessage("Você precisa estar logado para anunciar um item!");
            setShowModal(true);
            return;
        }

        try {
            // Garantir que usuario_id seja um número inteiro
            const usuarioId = parseInt(usuarioLogado.id_usuario);
            
            if (isNaN(usuarioId) || usuarioId <= 0) {
                setModalMessage("Erro: ID de usuário inválido. Por favor, faça login novamente.");
                setShowModal(true);
                return;
            }

            const item = {
                titulo: titulo.trim(),
                descricao: descricao.trim(),
                categoria: categoria.trim(),
                preco: parseFloat(preco) || 0,
                cidade: cidade || null,
                rua: rua || null,
                bairro: bairro || null,
                estado: estado || null,
                cep: cep || null,
                telefone: telefone || null,
                imagem: imagem || null,
                usuario_id: usuarioId
            };
            
            console.log("Dados enviados para API", item);
            console.log("Usuario ID (tipo):", typeof usuarioId, usuarioId);

            const response = await axios.post('http://localhost:3001/item', item);
            console.log("res api", response.status);

            if (response.status === 201) {
                setModalMessage("Item enviado ao backend!");
                setShowModal(true);
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            }

        } catch (error) {
            console.error('Erro ao adicionar item:', error);
            const errorMessage = error.response?.data?.details || error.response?.data?.error || error.message || 'Erro ao adicionar item';
            setModalMessage(`Erro: ${errorMessage}`);
            setShowModal(true);
        }
    };

    return (
        <div className="anunciar-container">

            {/* COLUNA ESQUERDA — FORMULÁRIO COM SCROLL */}
            <div className="form-area">

                <h2 className="anunciar-produto">Anunciar Item</h2>

                <label>Título</label>
                <input value={titulo} onChange={(e) => setTitulo(e.target.value)} />

                <label>Descrição</label>
                <textarea 
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />

                <label>Categoria</label>
                <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                    <option value="">Selecione</option>
                    <option value="Veículos">Veículos</option>
                    <option value="Ferramentas">Ferramentas</option>
                    <option value="Vestimentas">Vestimentas</option>
                    <option value="Espaço kids">Espaço kids</option>
                    <option value="Máquinas">Máquinas</option>
                    <option value="Salão de festa">Salão de festa</option>
                </select>

                <label>Preço da diária</label>
                <input
                    type="number"
                    value={preco}
                    min="0"
                    onChange={(e) => setPreco(e.target.value)}
                />

                <label>CEP</label>
                <input
                    className="inputs"
                    value={cep}
                    onChange={(e) => buscarCep(e.target.value)}
                    maxLength={9}
                    placeholder="00000-000"
                />

                <label>Cidade</label>
                <input className="inputs" value={cidade} readOnly />

                <label>Estado</label>
                <input type="text" className="inputs" value={estado} readOnly/>

                <label>Rua</label>
                <input type="text" className="inputs" value={rua} readOnly/>

                <label>Bairro</label>
                <input value={bairro} readOnly />

                <label>Telefone</label>
                <input
                    type="tel"
                    className="inputs"
                    value={telefone}
                    onChange={handleTelefoneChange}
                    maxLength={15}
                    placeholder="(11) 99999-9999"
                />

                <label>Imagens (máx 5)</label>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImagens}
                />

                <button className="button-publicar" onClick={enviarItem}  >
                    Publicar
                </button>
            </div>

            {/* COLUNA DIREITA — PRÉ-VISUALIZAÇÃO */}
            <div className="preview-area">

                <h2 className="pre-vizu-d">Pré-visualização</h2>

                <div className="preview-media">
                    {imagemPreview ? (
                        <img src={imagemPreview} alt="preview" />
                    ) : (
                        <div className="preview-placeholder">Nenhuma imagem selecionada</div>
                    )}
                </div>

                <div className="preview-info">
                    <h3>{titulo || "Título do item"}</h3>
                    <p>{descricao || "Descrição aparecerá aqui."}</p>
                    <strong>{preco ? `R$ ${preco}/dia` : "Preço da diária"}</strong>
                    <p>{bairro && cidade ? `${bairro}, ${cidade}` : "Localização aparecerá aqui"}</p>
                    {categoria && <p><strong>Categoria:</strong> {categoria}</p>}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <h3>{modalMessage}</h3>
                        <button onClick={() => setShowModal(false)} className="button-close-modal">Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
}