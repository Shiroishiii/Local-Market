import { createBrowserRouter } from "react-router-dom";
import Body from "../pages/Body";
import Perfil from "../pages/Perfil";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Carrinho from "../pages/Carrinho";
import Anunciar from "../pages/Anunciar";
import Pagamento from "../pages/Pagamento";
import Favoritos from "../pages/Favoritos";
import Ajuda from "../pages/Ajuda";
import Produto from "../pages/Produto";
import Configuracao from "../pages/Configuracao";
import ControleFinanceiro from "../pages/ControleFinanceiro";

const router = createBrowserRouter([

    {path: '/', element: <Body />},
    {path: '/perfil', element: <Perfil/>},
    {path: '/registro', element: <Register/>},
    {path: '/login', element: <Login />},
    {path: '/carrinho', element: <Carrinho/>},
    {path: '/anunciar', element: <Anunciar/>},
    {path: '/pagamento', element: <Pagamento />},
    {path: '/favoritos',element: <Favoritos />},
    {path: '/ajuda',element:<Ajuda/>},
    {path: '/configuracao',element:<Configuracao />},
    {path: '/controleFinanceiro', element:<ControleFinanceiro />},
    {path: '/produto', element: <Produto/>},
    {path: '/configuracao', element: <Configuracao/>}

])

export default router