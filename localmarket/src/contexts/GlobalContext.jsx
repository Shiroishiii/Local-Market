import { createContext, useState } from "react";

export const GlobalContext = createContext()

export const GlobalContextProvider = ({children}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
      }
    
    return(
        <GlobalContext.Provider value={{isSidebarOpen, setIsSidebarOpen, toggleSidebar}}>
            {children}
        </GlobalContext.Provider>
    )
}

