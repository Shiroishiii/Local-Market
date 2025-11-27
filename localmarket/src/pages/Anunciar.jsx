import { useState } from "react";
import "./Anunciar.css";

export default function Anunciar() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [cep, setCep] = useState("");

  const [imagens, setImagens] = useState([]);
  const [previewImagens, setPreviewImagens] = useState([]);

  const [video, setVideo] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);

  const [imagemIndex, setImagemIndex] = useState(0);

  function handleImagens(e) {
    const files = Array.from(e.target.files);

    if (imagens.length + files.length > 10) {
      alert("Você pode enviar no máximo 10 imagens.");
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
    if (imagemIndex >= i && imagemIndex > 0) {
      setImagemIndex(imagemIndex - 1);
    }
  }

  function removerVideo() {
    setVideo(null);
    setPreviewVideo(null);
  }

  function enviarFormulario(e) {
    e.preventDefault();
    alert("Anúncio criado! (Simulação)");
  }

<<<<<<< HEAD
  function prevImage() {
    setImagemIndex((prev) =>
      prev === 0 ? previewImagens.length - 1 : prev - 1
=======
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
>>>>>>> 40104e3ef76e0bb90d802472ee30070f8cadd99d
    );
  }

  function nextImage() {
    setImagemIndex((prev) =>
      prev === previewImagens.length - 1 ? 0 : prev + 1
    );
  }

  return (
    <div className="anunciar-wrapper">
      {/* FORMULÁRIO */}
      <div className="form-container">
        <h1 className="titulo-pagina">Criar Anúncio</h1>
        <form onSubmit={enviarFormulario} className="anunciar-form">
          
          <label htmlFor="titulo">Título</label>
          <input
            id="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            placeholder="Ex: Furadeira Elétrica"
          />

          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            rows={4}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            placeholder="Descrição detalhada do produto"
          ></textarea>

          <label htmlFor="preco">Preço por dia (R$)</label>
          <input
            id="preco"
            type="number"
            min="0"
            step="0.01"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
            placeholder="Ex: 25.00"
          />

          <label htmlFor="cep">CEP</label>
          <input
            id="cep"
            type="text"
            maxLength="9"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            placeholder="Ex: 12345-678"
            required
          />

          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            <option value="ferramentas">Ferramentas</option>
            <option value="eletronicos">Eletrônicos</option>
            <option value="eventos">Eventos</option>
            <option value="outros">Outros</option>
          </select>

          <hr />

          <label>Imagens (máx. 10)</label>
          <input type="file" multiple accept="image/*" onChange={handleImagens} />

          <div className="preview-imagens">
            {previewImagens.map((src, index) => (
              <div key={index} className="preview-item">
                <img src={src} alt={`preview ${index + 1}`} />
                <button
                  type="button"
                  className="remover-btn"
                  onClick={() => removerImagem(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <hr />

          <label>Vídeo (máx. 1)</label>
          {!video && (
            <input type="file" accept="video/*" onChange={handleVideo} />
          )}

          {previewVideo && (
            <div className="preview-video">
              <video controls src={previewVideo}></video>
              <button
                type="button"
                className="remover-btn"
                onClick={removerVideo}
              >
                ×
              </button>
            </div>
          )}

          <button type="submit" className="botao-enviar">
            Criar Anúncio
          </button>
        </form>
      </div>

      {/* PREVIEW */}
      <div className="preview-container">
        <h2>Prévia do seu anúncio</h2>
        <div className="preview-content">
          {/* MÍDIA */}
          <div className="preview-media">
            {previewImagens.length > 0 ? (
              <>
                <button className="nav-btn left" onClick={prevImage}>‹</button>
                <img
                  src={previewImagens[imagemIndex]}
                  alt={`Imagem ${imagemIndex + 1}`}
                  className="preview-main-img"
                />
                <button className="nav-btn right" onClick={nextImage}>›</button>
              </>
            ) : previewVideo ? (
              <video controls src={previewVideo} className="preview-main-video"></video>
            ) : (
              <div className="preview-placeholder">Sem mídia</div>
            )}
          </div>

          {/* DETALHES */}
          <div className="preview-details">
            <h3 className="preview-title">{titulo || "Título do anúncio"}</h3>
            <p className="preview-price">{preco ? `R$ ${preco}/dia` : "Preço"}</p>
            <p className="preview-desc">
              {descricao || "Descrição do anúncio aparecerá aqui."}
            </p>
            <p className="preview-categoria">
              {categoria ? `Categoria: ${categoria}` : "Categoria"}
            </p>
            <p className="preview-cep">{cep ? `CEP: ${cep}` : "CEP"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
