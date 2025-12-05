// GlobalContext.jsx
import React, { createContext, useState, useEffect } from "react";


/**
 * GlobalContext
 * - Guarda lista de produtos (produtos)
 * - Fornece adicionarProduto(prod) que POSTa no backend e atualiza o estado
 * - Faz fetch inicial GET /products ao montar
 */

export const GlobalContext = createContext();



export const GlobalContextProvider = ({ children }) => {
  const [usuarioLogado, setUsuarioLogado] = useState({
    id_usuario: 12,
    nome: "Maria",
    email: "Maria@gmail.com",
    senha: "1",
    cidade: null,
    rua: null,
    bairro: null,
    estado: null,
    cep: null,
    cpf: 1367829182,
    cnpj: null,
    telefone: 999903456713,
    tipo: null
});
  useEffect(() =>{
    console.log(usuarioLogado)
  },[usuarioLogado])

  





  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Lista de produtos vindos do backend (ou combinados com defaults na UI)
  const [produtos, setProdutos] = useState([]);

  // Toggle sidebar simples
  function toggleSidebar(){
    setIsSidebarOpen((v) => !v);
  } 

  // Carrega produtos do backend ao montar
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:3001/item");
        if (!res.ok) throw new Error("Falha ao buscar produtos");
        const data = await res.json();
        setProdutos(data || []);
      } catch (err) {
        console.warn("Não foi possível carregar produtos do backend:", err);
        // fallback: mantém produtos vazios — a UI pode usar defaults
      }
    }
    fetchProducts();
  }, []);

  // Adiciona produto no backend e atualiza estado local
  const adicionarProduto = async (produto) => {
    try {
      // POST /products espera um corpo JSON com os campos do produto
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto),
      });

      if (!res.ok) throw new Error("Falha ao salvar produto no backend");

      const saved = await res.json();

      // atualiza estado local (coloca no topo)
      setProdutos((prev) => [saved, ...prev]);

      return saved;
    } catch (err) {
      console.error("Erro ao adicionar produto:", err);

      // fallback local: adiciona com um id temporário e retorna
      const fallback = { ...produto, id: Date.now() };
      setProdutos((prev) => [fallback, ...prev]);
      return fallback;
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        toggleSidebar,

        usuarioLogado,
        setUsuarioLogado,

        produtos,
        adicionarProduto,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
