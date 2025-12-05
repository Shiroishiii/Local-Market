
import { useState, useMemo, useContext } from 'react'
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
  const allProducts = [
    {
      id: 1,
      name: "Furadeira Elétrica",
      price: "25.00",
      image: "./img/produto.png",
      seller: "João Silva",
      location: "Centro",
      locationKey: "centro",
      category: "ferramentas",
      rating: "4.8",
      description: "Furadeira potente para uso doméstico e profissional. Inclui brocas e acessórios."
    },
    {
      id: 2,
      name: "Bicicleta Mountain Bike",
      price: "40.00",
      image: "./img/produto.png",
      seller: "Maria Santos",
      location: "Vila Nova",
      locationKey: "vila-nova",
      category: "lazer",
      rating: "4.6",
      description: "Bicicleta para trilhas e passeios urbanos. Freios em perfeito estado."
    },
    {
      id: 3,
      name: "Mesa de Festa (8 lugares)",
      price: "35.00",
      image: "./img/produto.png",
      seller: "Pedro Costa",
      location: "Jardim das Flores",
      locationKey: "jardim-das-flores",
      category: "eventos",
      rating: "4.9",
      description: "Mesa retangular para eventos e festas. Inclui cadeiras e toalha."
    },
    {
      id: 4,
      name: "Aspirador de Pó",
      price: "15.00",
      image: "./img/produto.png",
      seller: "Ana Oliveira",
      location: "Bairro Alto",
      locationKey: "bairro-alto",
      category: "eletrodomesticos",
      rating: "4.7",
      description: "Aspirador potente para limpeza doméstica. Filtros higienizados."
    },
    {
      id: 5,
      name: "Tenda de Camping",
      price: "50.00",
      image: "./img/logo.png",
      seller: "Carlos Mendes",
      location: "Zona Sul",
      locationKey: "zona-sul",
      category: "lazer",
      rating: "4.9",
      description: "Tenda para 4 pessoas, impermeável e resistente. Inclui estacas e cordas."
    },
    {
      id: 6,
      name: "Câmera DSLR",
      price: "80.00",
      image: "./img/logo.png",
      seller: "Fernanda Lima",
      location: "Vila Madalena",
      locationKey: "vila-madalena",
      category: "profissional",
      rating: "4.5",
      description: "Câmera profissional para eventos e fotografia. Inclui lente e cartão de memória."
    }
  ]

  // Função para filtrar produtos
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Filtro por categoria
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false
      }

      // Filtro por preço
      if (filters.price !== 'all') {
        const price = parseFloat(product.price)
        switch (filters.price) {
          case '0-20':
            if (price > 20) return false
            break
          case '20-40':
            if (price < 20 || price > 40) return false
            break
          case '40-60':
            if (price < 40 || price > 60) return false
            break
          case '60+':
            if (price < 60) return false
            break
        }
      }

      // Filtro por localização
      if (filters.location !== 'all' && product.locationKey !== filters.location) {
        return false
      }

      // Filtro por busca
      if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !product.description.toLowerCase().includes(filters.search.toLowerCase()) &&
        !product.seller.toLowerCase().includes(filters.search.toLowerCase())) {
        return false
      }

      return true
    })
  }, [filters])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleSearchChange = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }))
  }


  return (

    <div className='body-container'>
      <Navbar 
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}/>
      <FilterBar
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        isExpanded={isSidebarOpen}
        onToggle={toggleSidebar}
      />
      <div className='products-grid'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
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