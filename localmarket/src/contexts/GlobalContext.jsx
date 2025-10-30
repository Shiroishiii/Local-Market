import { createContext, useState } from "react";

export const GlobalContext = createContext()

export const GlobalContextProvider = ({children}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
      }
<<<<<<< HEAD
    const[item, setItem] = useState('')
    const[categoria, setCategoria] = useState('')
    const[vendedor, setVendedor] = useState('')
    
    return(
        <GlobalContext.Provider value={{isSidebarOpen, setIsSidebarOpen,toggleSidebar}}>
=======
    
    return(
        <GlobalContext.Provider value={{isSidebarOpen, setIsSidebarOpen, toggleSidebar}}>
>>>>>>> cf90aa0d34f75cbc5df7b3c4103fbaa96daefe33
            {children}
        </GlobalContext.Provider>
    )
}

