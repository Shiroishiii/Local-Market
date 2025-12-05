import { useState, useMemo, useContext, useEffect } from 'react';
import './Body.css';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import Navbar from '../components/Navbar';
import { GlobalContext } from '../contexts/GlobalContext';

function Body() {
  const { isSidebarOpen, toggleSidebar } = useContext(GlobalContext);

  const [filters, setFilters] = useState({
    category: 'all',
    price: 'all',
    location: 'all',
    search: ''
  });

  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3001/item');
        const data = await res.json();

        const productsWithUser = await Promise.all(
          data.map(async (product) => {
            const resUser = await fetch(`http://localhost:3001/usuario/${product.usuario_id}`);
            const usuario = await resUser.json();
            return { ...product, usuario_nome: usuario.nome };
          })
        );

        setAllProducts(productsWithUser);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const titulo = product.titulo?.toLowerCase() || "";
      const descricao = product.descricao?.toLowerCase() || "";
      const categoria = product.categoria?.toLowerCase() || "";
      const cidade = product.cidade?.toLowerCase() || "";
      const preco = parseFloat(product.preco_diaria) || 0;

      if (filters.category !== "all" && categoria !== filters.category.toLowerCase()) return false;

      if (filters.price !== "all") {
        switch (filters.price) {
          case "0-20": if (preco > 20) return false; break;
          case "20-40": if (preco < 20 || preco > 40) return false; break;
          case "40-60": if (preco < 40 || preco > 60) return false; break;
          case "60+": if (preco < 60) return false; break;
        }
      }

      if (filters.location !== "all" && cidade !== filters.location.toLowerCase()) return false;

      if (filters.search) {
        const term = filters.search.toLowerCase();
        if (!titulo.includes(term) && !descricao.includes(term) && !categoria.includes(term) && !cidade.includes(term)) return false;
      }

      return true;
    });
  }, [filters, allProducts]);

  const handleFilterChange = (newFilters) => setFilters(newFilters);
  const handleSearchChange = (searchTerm) =>
    setFilters(prev => ({ ...prev, search: searchTerm }));

  return (
    <div className='body-container'>
      <Navbar onSearchChange={handleSearchChange} onFilterChange={handleFilterChange} />
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
  );
}

export default Body;
