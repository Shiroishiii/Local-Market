// GlobalContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar(){
    setIsSidebarOpen((v) => !v);
  }

  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch("http://localhost:3001/item");
        if (!res.ok) throw new Error("Falha ao buscar itens");
        const data = await res.json();
        setProdutos(data || []);
      } catch (err) {
        console.warn("Não foi possível carregar itens do backend:", err);
      }
    }
    fetchItems();
  }, []);

  const adicionarItem = async (produto) => {
    try {
      const res = await fetch("http://localhost:3001/item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto),
      });

      if (!res.ok) throw new Error("Falha ao salvar item no backend");

      const saved = await res.json();
      setProdutos((prev) => [saved, ...prev]);
      return saved;
    } catch (err) {
      console.error("Erro ao adicionar item:", err);
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
        adicionarItem,  // renomeado função para combinar
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
