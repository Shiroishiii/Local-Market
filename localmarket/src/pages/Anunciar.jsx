import { useState } from "react";
import "./Anunciar.css";

export default function Anunciar() {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [categoria, setCategoria] = useState("");

    const [imagens, setImagens] = useState([]);
    const [previewImagens, setPreviewImagens] = useState([]);

    const [video, setVideo] = useState(null);
    const [previewVideo, setPreviewVideo] = useState(null);

    function handleImagens(e) {
        const files = Array.from(e.target.files);

        if (imagens.length + files.length > 8) {
            alert("Você pode enviar no máximo 8 imagens.");
            return;
        }

        setImagens([...imagens, ...files]);
        setPreviewImagens([
            ...previewImagens,
            ...files.map((f) => URL.createObjectURL(f)),
        ]);
    }

    function handleVideo(e) {
        const file = e.target.files[0];
        if (file) {
            setVideo(file);
            setPreviewVideo(URL.createObjectURL(file));
        }
    }

    function removerImagem(i) {
        setImagens(imagens.filter((_, index) => index !== i));
        setPreviewImagens(previewImagens.filter((_, index) => index !== i));
    }

    function removerVideo() {
        setVideo(null);
        setPreviewVideo(null);
    }

    function enviarFormulario(e) {
        e.preventDefault();

        const dados = new FormData();
        dados.append("titulo", titulo);
        dados.append("descricao", descricao);
        dados.append("preco", preco);
        dados.append("categoria", categoria);

        imagens.forEach((img) => dados.append("imagens", img));
        if (video) dados.append("video", video);

        console.log("Enviando dados:", Object.fromEntries(dados));

        alert("Anúncio criado! (Simulação)");
    }

    return (
        <div className="anunciar-container">

            <h1 className="titulo-pagina">Criar Anúncio</h1>

            <form onSubmit={enviarFormulario} className="anunciar-form">

                <label>Título</label>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />

                <label>Descrição</label>
                <textarea
                    rows={4}
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    required
                ></textarea>

                <label>Preço por dia (R$)</label>
                <input
                    type="number"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    required
                />

                <label>Categoria</label>
                <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                >
                    <option value="">Selecione</option>
                    <option value="ferramentas">Ferramentas</option>
                    <option value="eletronicos">Máquinas</option>
                    <option value="eventos">Vestimentas</option>
                    <option value="outros">Espaço kids</option>
                    <option value="outros">Salão de festa</option>
                
                
                
                </select>

                <hr />

                <label>Imagens (máx. 8)</label>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImagens}
                />

                <div className="preview-imagens">
                    {previewImagens.map((src, index) => (
                        <div key={index} className="preview-item">
                            <img src={src} alt="preview" />

                            <button
                                type="button"
                                className="remover-btn"
                                onClick={() => removerImagem(index)}
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>

                <hr />

                <label>Vídeo (máx. 1)</label>

                {!video && (
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideo}
                    />
                )}

                {previewVideo && (
                    <div className="preview-video">
                        <video controls src={previewVideo}></video>

                        <button
                            type="button"
                            className="remover-btn"
                            onClick={removerVideo}
                        >
                            X
                        </button>
                    </div>
                )}

                <button type="submit" className="botao-enviar">
                    Criar Anúncio
                </button>
            </form>
        </div>
    );
}
