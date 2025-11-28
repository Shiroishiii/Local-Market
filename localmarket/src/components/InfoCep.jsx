// AQUI TA O PURO SUCO DO CHAT (CHAMA PROFESSOR PRA MELHORAR E EXPLICAR )

import { useState } from "react";
import "./infoCep.css";

 function InfoCep() {
  const [showModal, setShowModal] = useState(false);
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState(null);
  const [erro, setErro] = useState("");

  const buscarCep = async () => {
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      setErro("Digite um CEP válido.");
      setEndereco(null);
      return;
    }

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const dados = await resposta.json();

      if (dados.erro) {
        setErro("CEP não encontrado!");
        setEndereco(null);
      } else {
        setErro("");
        setEndereco(dados);
        salvarEnderecoNoBanco(dados);
        // ✅ Fechar o modal automaticamente após buscar
        setShowModal(false);
      }
    } catch {
      setErro("Erro ao buscar o CEP.");
    }
  };

  const salvarEnderecoNoBanco = async (dados) => {
    try {
      await fetch("http://localhost:3001/usuario/endereco", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_usuario: 1,  
          cidade: endereco.localidade,
          rua: endereco.logradouro,
          bairro: endereco.bairro,
          estado: endereco.uf,
          cep: endereco.cep
        }),
      });

      console.log("Endereço salvo no banco com sucesso.");
    } catch (error) {
      console.error("Erro ao salvar endereço:", error);
    }
  };


  return (
    <>
      {/* 🔹 BOTÃO NA NAVBAR */}
      <button className="btn-cep" onClick={() => setShowModal(true)}>
        {/* Se já tiver endereço, mostra a rua. Se não, mostra o texto padrão */}
        {endereco ? endereco.logradouro : "Informe teu CEP"}
      </button>

      {showModal && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div className="modal-container">
            <button className="fechar" onClick={() => setShowModal(false)}>
              &times;
            </button>

            <h2 className="font-subtitulos">Digite teu CEP</h2>

            <input
              type="text"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              placeholder="Ex: 00000-000"
              maxLength={9}
            />

            <button className="btn-buscar" onClick={buscarCep}>
              Buscar
            </button>

            {erro && <p className="erro">{erro}</p>}

             {endereco && (
              <div className="resultado">
                <p>
                  <strong>Rua:</strong> {endereco.logradouro}, {endereco.bairro}
                </p>
                <p>
                  <strong>Cidade:</strong> {endereco.localidade} - {endereco.uf}
                </p>
              </div>
              )}
          </div>
        </div>
      )}
    </>
  );
}

export default InfoCep