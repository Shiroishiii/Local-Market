import  { useState, useMemo, useContext } from 'react'
import './Body.css'
import ProductCard from '../components/ProductCard'
import FilterBar from '../components/FilterBar'
import Navbar from '../components/Navbar'
import { GlobalContext } from '../contexts/GlobalContext'

function Body() {
<<<<<<< HEAD
    const{isSidebarOpen, setIsSidebarOpen,toggleSidebar } = useContext(GlobalContext)

=======
    const{isSidebarOpen, setIsSidebarOpen, toggleSidebar} = useContext(GlobalContext)
    
>>>>>>> cf90aa0d34f75cbc5df7b3c4103fbaa96daefe33
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
      image: "./img/logo.png",
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
      image: "./img/logo.png",
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
      image: "./img/logo.png",
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
      image: "./img/logo.png",
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
    },
    {
      id: 7,
      name: "Churrasqueira Portátil",
      price: "30.00",
      image: "./img/logo.png",
      seller: "Roberto Alves",
      location: "Fazenda São José",
      locationKey: "fazenda-sao-jose",
      category: "lazer",
      rating: "4.8",
      description: "Churrasqueira a gás portátil. Inclui botijão e utensílios básicos."
    },
    {
      id: 8,
      name: "Ferramentas de Jardim",
      price: "20.00",
      image: "./img/logo.png",
      seller: "Lucia Ferreira",
      location: "Interior",
      locationKey: "interior",
      category: "ferramentas",
      rating: "4.6",
      description: "Kit completo: enxada, pá, rastelo, tesoura de poda e regador."
    },
    {
      id: 9,
      name: "Projetor HD",
      price: "60.00",
      image: "./img/logo.png",
      seller: "Antonio Rocha",
      location: "Horta Comunitária",
      locationKey: "horta-comunitaria",
      category: "profissional",
      rating: "4.7",
      description: "Projetor para apresentações e cinema em casa. Inclui cabo HDMI."
    },
    {
      id: 10,
      name: "Máquina de Lavar",
      price: "45.00",
      image: "./img/logo.png",
      seller: "Isabela Costa",
      location: "Sítio Verde",
      locationKey: "sitio-verde",
      category: "eletrodomesticos",
      rating: "4.9",
      description: "Máquina de lavar 8kg, econômica e silenciosa. Recém revisada."
    },
    {
      id: 11,
      name: "Escada de Alumínio",
      price: "25.00",
      image: "./img/logo.png",
      seller: "Miguel Santos",
      location: "Zona Rural",
      locationKey: "zona-rural",
      category: "ferramentas",
      rating: "4.4",
      description: "Escada extensível de 3 metros. Ideal para pintura e manutenção."
    },
    {
      id: 12,
      name: "Geladeira Portátil",
      price: "35.00",
      image: "./img/logo.png",
      seller: "Patricia Nunes",
      location: "Horta Urbana",
      locationKey: "horta-urbana",
      category: "eletrodomesticos",
      rating: "4.8",
      description: "Geladeira portátil para acampamentos e eventos. Funciona a bateria."
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