// Body.jsx
import React, { useState, useMemo, useContext } from "react";
import "./Body.css";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";
import Navbar from "../components/Navbar";
import { GlobalContext } from "../contexts/GlobalContext";

/**
 * Body.jsx
 * - Recebe produtos do GlobalContext (produtos)
 * - Mescla com produtos fixos (mínimo 4)
 * - Aplica filtros (categoria, price, location, search)
 * - Renderiza ProductCard para cada produto filtrado
 */

function Body() {
  const { produtos } = useContext(GlobalContext);

  const [filters, setFilters] = useState({
    category: "all",
    price: "all",
    location: "all",
    search: "",
  });

  // Produtos fixos (mínimo 4) — aparecem se não houver produtos dinâmicos suficientes
  const produtosFixos = [
    {
      id: 1001,
      name: "Furadeira Elétrica",
      price: "25.00",
      image: "./img/logo.png",
      seller: "João Silva",
      location: "Centro",
      locationKey: "centro",
      category: "ferramentas",
      rating: "4.8",
      description:
        "Furadeira potente para uso doméstico e profissional. Inclui brocas e acessórios.",
    },
    {
      id: 1002,
      name: "Bicicleta Mountain Bike",
      price: "40.00",
      image: "./img/logo.png",
      seller: "Maria Santos",
      location: "Vila Nova",
      locationKey: "vila-nova",
      category: "lazer",
      rating: "4.6",
      description: "Bicicleta para trilhas e passeios urbanos.",
    },
    {
      id: 1003,
      name: "Mesa de Festa (8 pessoas)",
      price: "35.00",
      image: "./img/logo.png",
      seller: "Pedro Costa",
      location: "Jardim das Flores",
      locationKey: "jardim-das-flores",
      category: "eventos",
      rating: "4.9",
      description: "Mesa retangular para eventos e festas.",
    },
    {
      id: 1004,
      name: "Aspirador de Pó",
      price: "15.00",
      image: "./img/logo.png",
      seller: "Ana Oliveira",
      location: "Bairro Alto",
      locationKey: "bairro-alto",
      category: "eletrodomesticos",
      rating: "4.7",
      description: "Aspirador potente para limpeza doméstica.",
    },
  ];

  // Junta produtos vindos do contexto com os fixos (contexto primeiro)
  // Garante que pelo menos os 4 fixos existam na lista final (evita duplicar IDs).
  const produtosCompletos = useMemo(() => {
    // se produtos do contexto estiverem vazios, retorna apenas os fixos
    if (!produtos || produtos.length === 0) return produtosFixos;

    // mescla mantendo ordem: produtos (dinâmicos) + fixos que ainda não existem por id
    const fixosNaoPresentes = produtosFixos.filter(
      (fixo) => !produtos.some((p) => String(p.id) === String(fixo.id))
    );
    return [...produtos, ...fixosNaoPresentes];
  }, [produtos]);

  // Aplica filtros sobre produtosCompletos
  const filteredProducts = useMemo(() => {
    return produtosCompletos.filter((product) => {
      // Categoria
      if (filters.category !== "all" && product.category !== filters.category)
        return false;

      // Preço
      if (filters.price !== "all") {
        const price = parseFloat(product.price);
        switch (filters.price) {
          case "0-20":
            if (price > 20) return false;
            break;
          case "20-40":
            if (price < 20 || price > 40) return false;
            break;
          case "40-60":
            if (price < 40 || price > 60) return false;
            break;
          case "60+":
            if (price < 60) return false;
            break;
          default:
            break;
        }
      }

      // Localização
      if (filters.location !== "all" && product.locationKey !== filters.location)
        return false;

      // Busca (name, description, seller)
      if (
        filters.search &&
        !product.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !product.description
          .toLowerCase()
          .includes(filters.search.toLowerCase()) &&
        !product.seller.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;

      return true;
    });
  }, [filters, produtosCompletos]);

  const handleFilterChange = (newFilters) => setFilters(newFilters);
  const handleSearchChange = (searchTerm) =>
    setFilters((prev) => ({ ...prev, search: searchTerm }));

  return (
    <div className="body-container">
      <Navbar />
      <FilterBar
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        isExpanded={false}
        onToggle={() => {}}
      />

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="no-results">
            <h3>Nenhum item encontrado</h3>
            <p>Tente ajustar os filtros ou fazer uma nova busca.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Body;
