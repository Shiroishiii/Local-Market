import { createBrowserRouter } from "react-router-dom";
import Body from "../pages/Body";
import Perfil from "../pages/Perfil";

const router = createBrowserRouter([
    {path: '/', element: <Body />},
    {path: '/perfil', element: <Perfil/>},

])

export default router