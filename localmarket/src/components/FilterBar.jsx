import React, { useState } from 'react'
import './FilterBar.css'

function FilterBar({ onFilterChange, onSearchChange, isExpanded, onToggle }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPrice, setSelectedPrice] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { value: 'all', label: 'Todas' },
    { value: 'ferramentas', label: 'Ferramentas' },
    { value: 'maquinas', label: 'Maquinas' },
    { value: 'vestimentas', label: 'Vestimentas' },
    { value: 'espaço kids', label: 'Espaço kids' },
    { value: 'salão de festa', label: 'Salão de festa' }
  ]

  const priceRanges = [
    { value: 'all', label: 'Qualquer' },
    { value: '0-20', label: 'Até R$ 20' },
    { value: '20-40', label: 'R$ 20-40' },
    { value: '40-60', label: 'R$ 40-60' },
    { value: '60+', label: 'R$ 60+' }
  ]

  const locations = [
    { value: 'all', label: 'Todas' },
    { value: 'centro', label: 'Centro' },
    { value: 'vila-nova', label: 'Vila Nova' },
    { value: 'jardim-das-flores', label: 'Jardim das Flores' },
    { value: 'bairro-alto', label: 'Bairro Alto' },
    { value: 'zona-sul', label: 'Zona Sul' }
  ]

  const handleCategoryChange = (e) => {
    const value = e.target.value
    setSelectedCategory(value)
    onFilterChange({
      category: value,
      price: selectedPrice,
      location: selectedLocation,
      search: searchTerm
    })
  }

  const handlePriceChange = (e) => {
    const value = e.target.value
    setSelectedPrice(value)
    onFilterChange({
      category: selectedCategory,
      price: value,
      location: selectedLocation,
      search: searchTerm
    })
  }

  const handleLocationChange = (e) => {
    const value = e.target.value
    setSelectedLocation(value)
    onFilterChange({
      category: selectedCategory,
      price: selectedPrice,
      location: value,
      search: searchTerm
    })
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearchChange(value)
    onFilterChange({
      category: selectedCategory,
      price: selectedPrice,
      location: selectedLocation,
      search: value
    })
  }

  const clearFilters = () => {
    setSelectedCategory('all')
    setSelectedPrice('all')
    setSelectedLocation('all')
    setSearchTerm('')
    onFilterChange({
      category: 'all',
      price: 'all',
      location: 'all',
      search: ''
    })
    onSearchChange('')
  }


  return (
    <>
      {/* Overlay de fundo */}
      {isExpanded && (
        <div className='sidebar-overlay' onClick={onToggle}></div>
      )}

      {/* Sidebar lateral */}
      <div className={`filter-sidebar ${isExpanded ? 'open' : ''}`}>
        <div className='sidebar-header'>
          <h3>Filtros</h3>
          <button onClick={onToggle} className='close-btn'>
            ✕
          </button>
        </div>
        
        <div className='sidebar-content'>
          <div className='filter-group'>
            <label htmlFor="category-filter">Categoria</label>
            <select 
              id="category-filter"
              value={selectedCategory} 
              onChange={handleCategoryChange}
              className='filter-select'
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className='filter-group'>
            <label htmlFor="price-filter">Preço</label>
            <select 
              id="price-filter"
              value={selectedPrice} 
              onChange={handlePriceChange}
              className='filter-select'
            >
              {priceRanges.map(price => (
                <option key={price.value} value={price.value}>
                  {price.label}
                </option>
              ))}
            </select>
          </div>

          <div className='filter-group'>
            <label htmlFor="location-filter">Local</label>
            <select 
              id="location-filter"
              value={selectedLocation} 
              onChange={handleLocationChange}
              className='filter-select'
            >
              {locations.map(loc => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>
          </div>

          <div className='filter-group'>
            <label htmlFor="search-filter">Buscar</label>
            <input
              id="search-filter"
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Nome do item..."
              className='filter-input'
            />
          </div>
        </div>

        <div className='sidebar-footer'>
          <button onClick={clearFilters} className='clear-filters-btn'>
            Limpar Filtros
          </button>
        </div>
      </div>
    </>
  )
}

export default FilterBar
