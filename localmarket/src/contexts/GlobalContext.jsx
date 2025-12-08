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

  const [produtosCarrinho, setProdutosCarrinho] = useState([])

  const adicionarCarrinho = (produto) => {
    setProdutosCarrinho((prevCarrinho) => [...prevCarrinho, produto])
  }

  const removerCarrinho = (id_item) => {
    setProdutosCarrinho((prevCarrinho) => prevCarrinho.filter((produto) => produto.id_item !== id_item));
  };

  const limparCarrinho = (produto => {
    setProdutosCarrinho([])
  })

  // Carregar usuário do localStorage na inicialização
  const [usuarioLogado, setUsuarioLogado] = useState(() => {
    const usuarioSalvo = localStorage.getItem('usuarioLogado');
    if (usuarioSalvo) {
      try {
        return JSON.parse(usuarioSalvo);
      } catch (e) {
        console.error('Erro ao parsear usuário do localStorage:', e);
      }
    }
    return {
      id_usuario: null,
      nome: "",
      email: "",
      senha: "",
      cidade: null,
      rua: null,
      bairro: null,
      estado: null,
      cep: null,
      cpf: '',
      cnpj: null,
      telefone: '',
      tipo: null,
      imagem: null
    };
  });

  // Salvar usuário no localStorage sempre que ele for atualizado
  useEffect(() => {
    try {
      if (usuarioLogado && usuarioLogado.id_usuario) {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        localStorage.setItem('id_usuario', usuarioLogado.id_usuario.toString());
        console.log('Usuário salvo no localStorage:', usuarioLogado);
      }
    } catch (error) {
      console.error('Erro ao salvar usuário no localStorage:', error);
    }
  }, [usuarioLogado])




  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Lista de produtos vindos do backend (ou combinados com defaults na UI)

  const [item, setItem] = useState([]);
  const [produtos, setProdutos] = useState([])

  function toggleSidebar() {
    setIsSidebarOpen((v) => !v);
  }
  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch("http://localhost:3001/item");
        if (!res.ok) throw new Error("Falha ao buscar produtos");
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




        usuarioLogado,
        setUsuarioLogado,

        produtos,
        adicionarItem,

        produtosCarrinho,
        adicionarCarrinho,
        removerCarrinho,
        limparCarrinho
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
