import { createBrowserRouter } from "react-router-dom";
import Body from "../pages/Body";
import Perfil from "../pages/Perfil";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Carrinho from "../pages/Carrinho";
import Anunciar from "../pages/Anunciar";
import Pagamento from "../pages/Pagamento";
import Produto from "../pages/Produto";

const router = createBrowserRouter([

    {path: '/', element: <Body />},
    {path: '/perfil', element: <Perfil/>},
    {path: '/registro', element: <Register/>},
    {path: '/login', element: <Login />},
    {path: '/carrinho', element: <Carrinho/>},
    {path: '/anunciar', element: <Anunciar/>},
    {path: '/pagamento', element: <Pagamento />},
    {path: '/produto', element: <Produto/>}

])

export default router