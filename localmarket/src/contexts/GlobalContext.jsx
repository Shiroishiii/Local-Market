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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() =>{
    console.log(isSidebarOpen)
  },[isSidebarOpen])
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
        const res = await fetch("http://localhost:3000/products");
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

        produtos,
        adicionarProduto,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
