import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import OrderRow from './OrderRow';
import { useQuery } from '@tanstack/react-query'
import Spinner from '../../../components/Spinner/Spinner';

const MyOrders = () => {
    const { user } = useContext(AuthContext);

    const { data: orders, isLoading } = useQuery({
        queryKey: ['bookings', 'orders'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/bookings?email=${user?.email}`, {
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
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
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