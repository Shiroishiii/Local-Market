import React, { useState } from "react";
import "./Anunciar.css";

export default function Anunciar() {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [preco, setPreco] = useState("");
    const [cep, setCep] = useState("");
    const [cidade, setCidade] = useState("");
    const [bairro, setBairro] = useState("");
    const [imagens, setImagens] = useState([]);
    const [video, setVideo] = useState(null);

    // ⬇ Busca cidade/bairro automaticamente
    const buscarCep = async (valor) => {
        setCep(valor);

        if (valor.length === 8) {
            const req = await fetch(`https://viacep.com.br/ws/${valor}/json/`);
            const data = await req.json();

            if (!data.erro) {
                setCidade(data.localidade);
                setBairro(data.bairro);
            }
        }
    };

    // ⬇ Salva imagens selecionadas
    const handleImagens = (e) => {
        const files = Array.from(e.target.files);
        setImagens(files.map((file) => URL.createObjectURL(file)));
    };

    // ⬇ Salva vídeo
    const handleVideo = (e) => {
        const file = e.target.files[0];
        if (file) setVideo(URL.createObjectURL(file));
    };

    // ⬇ Enviar produto
    const enviarItem = () => {
        alert("🚀 Produto pronto para enviar ao backend!");
        // Depois conectaremos ao seu backend
    };

    return (
        <div className="anunciar-container">

            {/* COLUNA ESQUERDA — FORMULÁRIO COM SCROLL */}
            <div className="form-area">

                <h2>Anunciar Produto</h2>

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
                    <option value="Ferramentas">Ferramentas</option>
                    <option value="Construção">Construção</option>
                    <option value="Eletrônicos">Eletrônicos</option>
                </select>

                <label>Preço da diária</label>
                <input
                    type="number"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                />

                <label>CEP</label>
                <input
                    value={cep}
                    onChange={(e) => buscarCep(e.target.value)}
                    maxLength={8}
                />

                <label>Cidade</label>
                <input value={cidade} readOnly />

                <label>Bairro</label>
                <input value={bairro} readOnly />

                <label>Imagens (máx 10)</label>
                <input type="file" multiple accept="image/*" onChange={handleImagens} />

                <label>Vídeo</label>
                <input type="file" accept="video/*" onChange={handleVideo} />

                <button onClick={enviarItem}>Publicar</button>
            </div>

            {/* COLUNA DIREITA — PRÉ-VISUALIZAÇÃO ESTILO FACEBOOK */}
            <div className="preview-area">

                <h2>Pré-visualização</h2>

                {/* Imagem / vídeo maior à direita */}
                <div className="preview-media">
                    {video ? (
                        <video controls src={video} />
                    ) : imagens.length > 0 ? (
                        <img src={imagens[0]} alt="preview" />
                    ) : (
                        <div className="preview-placeholder">Nenhuma mídia selecionada</div>
                    )}
                </div>

                {/* Miniaturas embaixo */}
                <div className="preview-thumbs">
                    {imagens.map((img, i) => (
                        <img key={i} src={img} />
                    ))}
                </div>

                {/* Informações abaixo — igual Facebook */}
                <div className="preview-info">
                    <h3>{titulo || "Título do produto"}</h3>
                    <p>{descricao || "Descrição aparecerá aqui."}</p>
                    <strong>{preco ? `R$ ${preco}/dia` : "Preço da diária"}</strong>
                    <p>{bairro && `${bairro}, ${cidade}`}</p>
                </div>
            </div>
        </div>
    );
}
