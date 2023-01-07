import {createBrowserRouter} from "react-router-dom";
import Main from "../../layouts/Main";
import Blogs from "../../pages/Blogs/Blogs";
import CategoryWiseBikes from "../../pages/CategoryWiseBikes/CategoryWiseBikes";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/SignUp/SignUp";

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
    }
])

export default router;