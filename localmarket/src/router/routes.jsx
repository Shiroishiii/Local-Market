import { createBrowserRouter } from "react-router-dom";
import Body from "../pages/Body";
import Perfil from "../pages/Perfil";
import Register from "../pages/Register";
import Login from "../pages/Login";

const router = createBrowserRouter([
    {path: '/', element: <Body />},
    {path: '/perfil', element: <Perfil/>},
    {path: '/registro', element: <Register/>},
    {path: '/login', element: <Login />}
])

export default router