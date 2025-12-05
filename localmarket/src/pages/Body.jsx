
import { useState, useMemo, useContext, useEffect } from 'react'
import './Body.css'
import ProductCard from '../components/ProductCard'
import FilterBar from '../components/FilterBar'
import Navbar from '../components/Navbar'
import { GlobalContext } from '../contexts/GlobalContext'

function Body() {
  const { isSidebarOpen, setIsSidebarOpen, toggleSidebar } = useContext(GlobalContext)

  const [filters, setFilters] = useState({
    category: 'all',
    price: 'all',
    location: 'all',
    search: ''
  })

  // Dados de exemplo dos itens para aluguel
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {

    fetch('http://localhost:3001/item')
      .then(res => res.json())
      .then(data => {
        console.log('Produtos vindos do Backend: ', data);
        setAllProducts(data)
      })
      .catch(err => console.error('Erro: ', err))
  }, [])

  // Função para filtrar produtos
  const filteredProducts = useMemo(() => {
  return allProducts.filter(product => {
    
    const titulo = product.titulo?.toLowerCase() || "";
    const descricao = product.descricao?.toLowerCase() || "";
    const categoria = product.categoria?.toLowerCase() || "";
    const cidade = product.cidade?.toLowerCase() || "";
    const preco = parseFloat(product.preco_diaria); 

    // Filtro por categoria
    if (filters.category !== "all" && categoria !== filters.category.toLowerCase()) {
      return false;
    }

    // Filtro por preço
    if (filters.price !== "all") {
      switch (filters.price) {
        case "0-20":
          if (preco > 20) return false;
          break;
        case "20-40":
          if (preco < 20 || preco > 40) return false;
          break;
        case "40-60":
          if (preco < 40 || preco > 60) return false;
          break;
        case "60+":
          if (preco < 60) return false;
          break;
      }
    }

    // Filtro por localização
    if (filters.location !== "all" && cidade !== filters.location.toLowerCase()) {
      return false;
    }

    // Filtro por busca
    if (filters.search) {
      const term = filters.search.toLowerCase();
      if (
        !titulo.includes(term) &&
        !descricao.includes(term) &&
        !categoria.includes(term) &&
        !cidade.includes(term)
      ) {
        return false;
      }
    }

    return true;
  });
}, [filters, allProducts]);


const handleFilterChange = (newFilters) => {
  setFilters(newFilters)
}

const handleSearchChange = (searchTerm) => {
  setFilters(prev => ({ ...prev, search: searchTerm }))
}

useEffect(() => {
  fetch('http://localhost:3001/item')
    .then(res => res.json())
    .then(async (data) => {
      // Buscar dados do usuário para cada produto
      const productsWithUser = await Promise.all(
        data.map(async (product) => {
          const res = await fetch(`http://localhost:3001/usuario/${product.usuario_id}`);
          const usuario = await res.json();
          return { ...product, usuario_nome: usuario.nome};
        })
      );
      setAllProducts(productsWithUser);
    });
}, []);



return (

  <div className='body-container'>
    <Navbar />
    <FilterBar
      onFilterChange={handleFilterChange}
      onSearchChange={handleSearchChange}
      isExpanded={isSidebarOpen}
      onToggle={toggleSidebar}
    />
    <div className='products-grid'>
      {filteredProducts.length > 0 ? (
        filteredProducts.map(product => (
          <ProductCard key={product.id_item} product={product} />
        ))
      ) : (
        <div className='no-results'>
          <h3>Nenhum item encontrado</h3>
          <p>Tente ajustar os filtros ou fazer uma nova busca.</p>
        </div>
      )}
    </div>
  </div>
)
}

export default Body