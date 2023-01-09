import React, { useContext } from 'react';
import Navbar from '../pages/Shared/Navbar/Navbar';
import { Link, Outlet } from 'react-router-dom';
import useBuyer from '../hooks/useBuyer';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext)
    const [isBuyer] = useBuyer(user?.email);
    const [isAdmin] = useAdmin(user?.email);

    return (
        <>
            <Navbar />
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col p-5 bg-[#E8F4FF]">
                    {/* <!-- Page content here --> */}
                    {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-72 text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        {
                            isBuyer &&
                            <>
                                <li className='border-2 rounded-lg mb-2'>
                                    <Link className='font-medium text-lg' to="/dashboard/orders">My Orders</Link>
                                </li>
                            </>
                        }
                        {
                            isAdmin &&
                            <>
                                <li className='border-2 rounded-lg mb-2'>
                                    <Link className='font-medium text-lg' to="/dashboard/sellers">All Sellers</Link>
                                </li>
                                <li className='border-2 rounded-lg mb-2'>
                                    <Link className='font-medium text-lg' to="/dashboard/buyers">All Buyers</Link>
                                </li>
                                <li className='border-2 rounded-lg mb-2'>
                                    <Link className='font-medium text-lg' to="/dashboard/reported">Reported Items</Link>
                                </li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </>
    );
};

export default DashboardLayout;