import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import OrderRow from './OrderRow';
import { useQuery } from '@tanstack/react-query'
import Spinner from '../../../components/Spinner/Spinner';
import useTitle from '../../../hooks/useTitle';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    useTitle('My Orders');

    const { data: orders, isLoading } = useQuery({
        queryKey: ['bookings', 'orders', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://bikez-plug-server.vercel.app/bookings?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div>
            <h3 className='text-2xl font-semibold text-center mb-4'>My orders</h3>
            {
                !orders.length ?
                    <p className="text-2xl text-medium flex items-center justify-center italic opacity-50 h-40">You have no orders to show</p>
                    :
                    <div className="overflow-x-auto w-full">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>
                                    </th>
                                    <th>Picture</th>
                                    <th>Item & Price</th>
                                    <th>Booking Date</th>
                                    <th>Payment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map(order => <OrderRow
                                        key={order._id}
                                        order={order}
                                    />)
                                }

                            </tbody>

                            <tfoot>
                                <tr>
                                    <th></th>
                                    <th>Total</th>
                                    <th>{orders.length} items</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </tfoot>

                        </table>
                    </div>
            }
        </div>
    );
};

export default MyOrders;