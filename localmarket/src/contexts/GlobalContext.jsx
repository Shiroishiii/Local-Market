import { createContext, useState } from "react";

export const GlobalContext = createContext()

export const GlobalContextProvider = ({children}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
      }
    const[item, setItem] = useState('')
    const[categoria, setCategoria] = useState('')
    const[vendedor, setVendedor] = useState('')
    
    return(
        <GlobalContext.Provider value={{isSidebarOpen, setIsSidebarOpen,toggleSidebar}}>
            {children}
        </GlobalContext.Provider>
    )
}

