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

        // ✅ Fechar o modal automaticamente após buscar
        setShowModal(false);
      }
    } catch {
      setErro("Erro ao buscar o CEP.");
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

            <h2>Digite teu CEP</h2>

            <input
              type="text"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              placeholder="Ex: 88095-300"
              maxLength={9}
            />

            <button className="btn-buscar" onClick={buscarCep}>
              Buscar
            </button>

            {erro && <p className="erro">{erro}</p>}

             {endereco && (
              <div className="resultado">
                <p>
                  <strong>Endereço:</strong> {endereco.logradouro}, {endereco.bairro}
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