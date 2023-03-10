import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../assets/logo/logo.png';
import Spinner from '../../../components/Spinner/Spinner';
import { AuthContext } from '../../../contexts/AuthProvider';
import useAdmin from '../../../hooks/useAdmin';
import useBuyer from '../../../hooks/useBuyer';
import useSeller from '../../../hooks/useSeller';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isBuyer, isBuyerLoading] = useBuyer(user?.email);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    const [isSeller, isSellerLoading] = useSeller(user?.email);
    const navigate = useNavigate();

    const menuItems = <>
        <li className='font-semibold text-lg'><Link to="/">Home</Link></li>
        <li className='font-semibold text-lg'><Link to="/blogs">Blogs</Link></li>


    </>;


    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/login');
            })
            .catch(err => console.error(err));
    }

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                        <li className='font-semibold text-lg'><button onClick={handleLogOut}>Log Out</button></li>
                    </ul>
                </div>
                <Link to="/">
                    <div className="flex items-center lg:pl-4 gap-1">
                        <img className='hidden lg:inline' src={logo} alt="website-logo" />
                        <span className='normal-case text-xl font-semibold'>Bikez Plug</span>
                    </div>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end">
                <ul className="menu menu-horizontal px-1">
                    {
                        !!user?.uid ?
                            <>

                                <div className="dropdown dropdown-hover">
                                    <label onClick={() => navigate('/dashboard')} tabIndex={0} className="btn btn-ghost normal-case text-lg py-3">Dashboard</label>
                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                        {
                                            isBuyer && !isBuyerLoading &&
                                            <>
                                                <li><Link to="/dashboard/orders">My Orders</Link></li>
                                            </>
                                        }
                                        {
                                            isAdmin && !isAdminLoading &&
                                            <>
                                                <li><Link to="/dashboard/sellers">All Sellers</Link></li>
                                                <li><Link to="/dashboard/buyers">All Buyers</Link></li>
                                                <li><Link to="/dashboard/reported">Reported Items</Link></li>
                                            </>
                                        }
                                        {
                                            isSeller && !isSellerLoading &&
                                            <>
                                                <li><Link to="/dashboard/add-product">Add a product</Link></li>
                                                <li><Link to="/dashboard/my-products">My Products</Link></li>
                                            </>
                                        }

                                    </ul>
                                </div>

                                <li className='font-semibold hidden lg:block text-lg'><button onClick={handleLogOut}>Log Out</button></li>
                            </>
                            :
                            <>
                                <li className='font-semibold text-lg'><Link to="/login">Login</Link></li>
                                <li className='font-semibold text-lg'><Link to="/signup">Sign Up</Link></li>
                            </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Navbar;