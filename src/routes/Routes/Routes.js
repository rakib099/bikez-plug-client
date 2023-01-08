import {createBrowserRouter} from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import Main from "../../layouts/Main";
import Blogs from "../../pages/Blogs/Blogs";
import CategoryWiseBikes from "../../pages/CategoryWiseBikes/CategoryWiseBikes/CategoryWiseBikes";
import MyOrders from "../../pages/Dashboard/MyOrders/MyOrders";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/SignUp/SignUp";
import BuyerRoute from "../BuyerRoute/BuyerRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/blogs',
                element: <Blogs />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
            {
                path: '/category/:id',
                element: <CategoryWiseBikes />,
                loader: ({params}) => fetch(`http://localhost:5000/category-titles/${params.id}`)
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path: '/dashboard/orders',
                element: <BuyerRoute><MyOrders /></BuyerRoute>
            }
        ]
    }
])

export default router;