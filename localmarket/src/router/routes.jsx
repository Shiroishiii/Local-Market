import { createBrowserRouter } from "react-router-dom";
import Body from "../pages/Body";
import Perfil from "../pages/Perfil";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Carrinho from "../pages/Carrinho";
import Anunciar from "../pages/Anunciar";
import Pagamento from "../pages/Pagamento";
import RegistroFinanceiro from "../pages/RegistroFinanceiro";
import HistoricoTransacoes from "../pages/HistoricoTransacoes";
import Favoritos from "../pages/Favoritos";
import Ajuda from "../pages/Ajuda";
import Configuracao from "../pages/Configuracao";

const router = createBrowserRouter([

    {path: '/', element: <Body />},
    {path: '/perfil', element: <Perfil/>},
    {path: '/registro', element: <Register/>},
    {path: '/login', element: <Login />},
    {path: '/carrinho', element: <Carrinho/>},
    {path: '/anunciar', element: <Anunciar/>},
    {path: '/pagamento', element: <Pagamento />},
    {path: '/registrofinanceiro',element: <RegistroFinanceiro />},
    {path: '/historicotransacoes',element: <HistoricoTransacoes/>},
    {path: '/favoritos',element: <Favoritos />},
    {path: '/ajuda',element:<Ajuda/>},
    {path: '/configuracao',element:<Configuracao/>},
    
])

export default router