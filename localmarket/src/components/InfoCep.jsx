import { useState } from "react";
import "./infoCep.css";

function InfoCep() {
  const [showModal, setShowModal] = useState(false);
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState(null);
  const [erro, setErro] = useState("");



  const buscarCep = async () => {
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      setErro("Digite um CEP válido.");
      setRua(null);
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const dados = await response.json();

      if (dados.erro) {
        setErro("CEP não encontrado!");
        setRua(null);
      } else {
        setErro("");
        setRua(dados);

        // 👇 SALVAR O ENDEREÇO NO BANCO
        salvarEnderecoNoBanco(dados);

        // Fechar modal depois
        setShowModal(false);
      }
    } catch {
      setErro("Erro ao buscar o CEP.");
    }
  };

  const salvarEnderecoNoBanco = async (dados) => {
  try {
    const id_usuario = localStorage.getItem("id_usuario");

  const response =  await fetch("http://localhost:3001/usuario/endereco", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_usuario,
        cidade: dados.localidade,
        rua: dados.logradouro,
        bairro: dados.bairro,
        estado: dados.uf,
        cep: dados.cep
      }),
    });
    if(!response.ok){
      const erro = await response.json();
      console.error("Erro ao salvar:", erro);
      return;
    }
    console.log("Endereço salvo com sucesso.");
  }catch (error){
    console.log("ERRO FATAL no salvarendereco:", error)
  }
}


  

  return (
    <>
      <button className="btn-cep" onClick={() => setShowModal(true)}>
        {rua ? rua.logradouro : "Informe teu CEP"}
      </button>

      {showModal && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div className="modal-cont">
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

            {rua && (
              <div className="resultado">
                <p>
                  <strong>Rua:</strong> {rua.logradouro}, {rua.bairro}
                </p>
                <p>
                  <strong>Cidade:</strong> {rua.localidade} - {rua.uf}
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
