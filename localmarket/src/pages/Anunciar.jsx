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
    const [imagem, setImagem] = useState([]);
    const [loading, setLoading] = useState(false);
    const {usuarioLogado} = useContext(GlobalContext)


    const  navigate = useNavigate()
    // Buscar cidade e bairro pelo CEP
    const buscarCep = async (valor) => {
        setCep(valor);
        
        if (valor.length === 8) {
            const req = await fetch(`https://viacep.com.br/ws/${valor}/json/`);
            const data = await req.json();
            
            
            if (!data.erro) {
                setCidade(data.localidade);
                setBairro(data.bairro);
                setRua(data.logradouro)
                setEstado(data.uf)
            }
        }
    };
    
    // Imagens (máximo 5)
    const handleImagens = (e) => {
        const files = Array.from(e.target.files);
        
        if (files.length > 1) {
            alert("Você só pode enviar no máximo 1 imagem.");
            return;
        }
        
        // const previews = files.map((file) => URL.createObjectURL(file));
        // const previews =  URL.createObjectURL(files[0]);
        const previews =  files[0].name;
        setImagem(previews);
    };
    
    // Enviar item
    const enviarItem = async () => {
        try {
            // const id_usuario = localStorage.getItem('id_usuario')
            const item = {
                titulo,
                descricao,
                categoria,
                preco,
                cidade,
                rua,
                bairro,
                estado,
                cep,
                telefone,
                imagem,
                usuario_id: usuarioLogado.id_usuario
            };
            
            console.log("Dados enviados para API", item);

            const response = await axios.post('http://localhost:3001/item', item);
            console.log("res api", response.status);

            if (response.status === 201) {
                alert("Item enviado ao backend!")
                 navigate('/');
            }

        } catch (error) {
            console.error('Erro ao adicionar item:', error);
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
                    maxLength={8}
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
                    type="text"
                    className="inputs"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
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

                {/* <div className="preview-media">
                    {imagens.length > 0 ? (
                        <img src={imagens[0]} alt="preview" />
                    ) : (
                        <div className="preview-placeholder">Nenhuma imagem selecionada</div>
                    )}
                </div> */}

                {/* <div className="preview-thumbs">
                    {imagens.map((img, i) => (
                        <img key={i} src={img} />
                    ))}
                </div> */}

                <div className="preview-info">
                    <h3>{titulo || "Título do item"}</h3>
                    <p>{descricao || "Descrição aparecerá aqui."}</p>
                    <strong>{preco ? `R$ ${preco}/dia` : "Preço da diária"}</strong>
                    <p>{bairro && `${bairro}, ${cidade}`}</p>
                </div>
            </div>
        </div>
    );
}