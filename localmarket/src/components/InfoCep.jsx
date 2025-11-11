// AQUI TA O PURO SUCO DO CHAT (CHAMA PROFESSOR PRA MELHORAR E EXPLICAR )

import React, { useState } from 'react'

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
          }
        } catch {
          setErro("Erro ao buscar o CEP.");
        }
      };
    
      return (
        <>
          {/* Botão na navbar */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-transparent text-white border-none cursor-pointer"
          >
            Informe teu CEP
          </button>
    
          {/* Modal */}
          {showModal && (
            <div
              className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
              onClick={(e) => {
                if (e.target === e.currentTarget) setShowModal(false);
              }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center relative">
                <button
                  className="absolute top-2 right-3 text-gray-500 text-xl"
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </button>
    
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  Digita teu CEP
                </h2>
    
                <input
                  type="text"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  placeholder="Ex: 90000-000"
                  className="border border-gray-300 rounded-lg p-2 w-full mb-3 text-center"
                  maxLength={9}
                />
    
                <button
                  onClick={buscarCep}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition"
                >
                  Buscar
                </button>
    
                {erro && <p className="text-red-500 mt-3">{erro}</p>}
    
                {endereco && (
                  <div className="mt-4 text-gray-700 text-sm">
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