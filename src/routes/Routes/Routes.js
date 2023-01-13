import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import Main from "../../layouts/Main";
import Blogs from "../../pages/Blogs/Blogs";
import CategoryWiseBikes from "../../pages/CategoryWiseBikes/CategoryWiseBikes/CategoryWiseBikes";
import AddProduct from "../../pages/Dashboard/AddProduct/AddProduct";
import Buyers from "../../pages/Dashboard/Buyers/Buyers";
import Dashboard from "../../pages/Dashboard/Dashboard/Dashboard";
import MyOrders from "../../pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../../pages/Dashboard/MyProducts/MyProducts";
import ReportedItems from "../../pages/Dashboard/ReportedItems/ReportedItems";
import Sellers from "../../pages/Dashboard/Sellers/Sellers";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import Payment from "../../pages/Payment/Payment";
import SignUp from "../../pages/SignUp/SignUp";
import AdminRoute from "../AdminRoute/AdminRoute";
import BuyerRoute from "../BuyerRoute/BuyerRoute";
import SellerRoute from "../SellerRoute/SellerRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
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
                loader: ({ params }) => fetch(`https://bikez-plug-server.vercel.app/category-titles/${params.id}`)
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/dashboard/orders',
                element: <BuyerRoute><MyOrders /></BuyerRoute>
            },
            {
                path: '/dashboard/sellers',
                element: <AdminRoute><Sellers /></AdminRoute>
            },
            {
                path: '/dashboard/buyers',
                element: <AdminRoute><Buyers /></AdminRoute>
            },
            {
                path: '/dashboard/reported',
                element: <AdminRoute><ReportedItems /></AdminRoute>
            },
            {
                path: '/dashboard/add-product',
                element: <SellerRoute><AddProduct /></SellerRoute>
            },
            {
                path: '/dashboard/my-products',
                element: <SellerRoute><MyProducts /></SellerRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <BuyerRoute><Payment /></BuyerRoute>,
                loader: ({ params }) => fetch(`https://bikez-plug-server.vercel.app/bookings/${params.id}`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
            }
        ]
    }
])

export default router;