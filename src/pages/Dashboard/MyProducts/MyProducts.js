import React, { useState, useContext } from 'react';
import ConfirmModal from '../../Shared/ConfirmModal/ConfirmModal';
import ProductRow from './ProductRow';
import { useQuery } from '@tanstack/react-query';
import { async } from '@firebase/util';
import { AuthContext } from '../../../contexts/AuthProvider';
import Spinner from '../../../components/Spinner/Spinner';
import { toast } from 'react-hot-toast';
import useTitle from '../../../hooks/useTitle';

const MyProducts = () => {
    const [bike, setBike] = useState(null);
    const { user } = useContext(AuthContext);
    useTitle('My Products');

    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ['products', 'bikes', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://bikez-plug-server.vercel.app/bikes?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Spinner />
    }

    const handleDeleteProduct = ({ _id }) => {
        fetch(`https://bikez-plug-server.vercel.app/bikes/${_id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    setBike(null);
                    refetch();
                    toast.success("Product successfully deleted!");
                }
            })
            .catch(err => console.error(err));
    }

    return (
        <div>
            <h3 className='text-2xl font-semibold text-center mb-4'>My Products</h3>
            {
                !products.length ?
                    <p className="text-2xl text-medium flex items-center justify-center italic opacity-50 h-40">You have no products to show</p>
                    :
                    <div className="overflow-x-auto w-full">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>
                                    </th>
                                    <th>Picture</th>
                                    <th>Item & Price</th>
                                    <th>Status</th>
                                    <th>Delete</th>
                                    <th>Toggle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map(product => <ProductRow
                                        key={product._id}
                                        product={product}
                                        setBike={setBike}
                                        refetch={refetch}
                                    />)
                                }
                            </tbody>

                            <tfoot>
                                <tr>
                                    <th></th>
                                    <th>Total</th>
                                    <th>{products.length} items</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </tfoot>

                        </table>
                    </div>
            }

            {
                !!bike &&
                <ConfirmModal
                    title={`Are you sure, you want to delete ${bike.name}?`}
                    modalData={bike}
                    successAction={handleDeleteProduct}
                />
            }
        </div>
    );
};

export default MyProducts;