import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Menu from "../Pages/Menu/Menu";
import Order from "../Pages/Order/Order";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/menu',
                element: <Menu />
            },
            {
                path: '/order/:category',
                element: <Order></Order>
               
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            },
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><Dashboard/></PrivateRoute>,
        children:[
            // normal user
            {
                path:'cart',
                element:<Cart/>
            }, 
            //  admin routes only 
            {
                path:'addItems',
                element:<AdminRoute><AddItems/></AdminRoute>
            },
            {
                path:'manageItems',
                element:<AdminRoute><ManageItems/></AdminRoute>
            },

            {
                path: 'allUsers',
                element:<AdminRoute><AllUsers/></AdminRoute>

            }
        ]
    }
]);

export default router;