import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Spinner from '../../../components/Spinner/Spinner';
import SellerRow from './SellerRow';

const Sellers = () => {
    const { data: sellers, isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users/sellers', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div>
            <h3 className='text-2xl font-semibold text-center mb-4'>All Sellers</h3>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Delete</th>
                            <th>Verification</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers.map((seller, idx) => <SellerRow 
                                key={seller._id} 
                                seller={seller}
                                idx={idx}
                                refetch={refetch}
                            />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Sellers;