import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Body from './components/Body'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      <div>
        <Navbar onToggleFilters={toggleSidebar} />
        <Body isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
      </div>

    </>
  )
}

export default App
