import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Menu from "../Pages/Menu/Menu";
import Order from "../Pages/Order/Order";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children:[
            {
                path:'/',
                element: <Home/>
            },
            {
                path:'/menu',
                element:<Menu/>
            },
            {
                path:'/order',
                element: <Order></Order>
            }
        ]
    },
]);

export default router;