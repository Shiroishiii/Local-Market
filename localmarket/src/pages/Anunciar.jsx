import React, { useState } from "react";
import "./Anunciar.css";
import axios from 'axios'

export default function Anunciar() {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [preco, setPreco] = useState("");
    const [cidade, setCidade] = useState("");
    const [bairro, setBairro] = useState("");
    const [cep, setCep] = useState("");
    const [telefone, setTelefone] = useState('')
    const [imagens, setImagens] = useState([]);
    const [video, setVideo] = useState(null);

    //  Busca cidade/bairro automaticamente
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

    //  Salva imagens selecionadas
    const handleImagens = (e) => {
        const files = Array.from(e.target.files);
        setImagens(files.map((file) => URL.createObjectURL(file)));
    };

    //  Salva vídeo
    const handleVideo = (e) => {
        const file = e.target.files[0];
        if (file) setVideo(URL.createObjectURL(file));
    };

    //  Enviar produto
    const enviarItem = async () => {
           try{
      const item = {
        titulo: titulo,
        descricao: descricao,
        categoria: categoria,
        preco: preco,
        cidade: cidade,
        bairro: bairro,
        cep: cep,
        telefone: telefone
      };
      console.log("Dados enviados para API", item);
      
      const response = await axios.post('http://localhost:3001/item',item);
      console.log("res api", response.status);
      
      if(response.status === 201){
          alert("🚀 Produto enviado ao backend!");
      } 
        }catch (error) {
        console.error('Erro ao adicionar item:', error);
      }

    
    };

    return (
        <div className="anunciar-container">

            {/* COLUNA ESQUERDA — FORMULÁRIO COM SCROLL */}
            <div className="form-area">

                <h2 className="anunciar-produto">Anunciar Produto</h2>

                <label >Título</label>
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
                    value={preco} min="0"
                    onChange={(e) => setPreco(e.target.value)}
                />

                <label>CEP</label>
                <input className="inputs"
                    value={cep}
                    onChange={(e) => buscarCep(e.target.value)}
                    maxLength={8}
                />

                <label>Cidade</label>
                <input className="inputs" value={cidade} readOnly />

                <label>Bairro</label>
                <input value={bairro} readOnly />

                <label htmlFor=""> Telefone</label>
                <input type="text" className="inputs"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}/>

                <label>Imagens (máx 10)</label>
                <input type="file" multiple accept="image/*" onChange={handleImagens} />

                <label>Vídeo</label>
                <input type="file" accept="video/*" onChange={handleVideo} />

                <button className="button-publicar" onClick={enviarItem}>Publicar</button>
            </div>

            {/* COLUNA DIREITA — PRÉ-VISUALIZAÇÃO  */}
            <div className="preview-area">

                <h2 className="pre-vizu-d">Pré-visualização</h2>

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

                {/* Informações abaixo */}
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
