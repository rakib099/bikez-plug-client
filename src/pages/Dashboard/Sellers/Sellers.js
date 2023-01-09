import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Spinner from '../../../components/Spinner/Spinner';
import ConfirmModal from '../../Shared/ConfirmModal/ConfirmModal';
import SellerRow from './SellerRow';

const Sellers = () => {
    const [seller, setSeller] = useState(null);
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

    const handleDeleteSeller = ({ _id }) => {
        fetch(`http://localhost:5000/sellers/${_id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    setSeller(null);
                    refetch();
                    toast.success("Seller successfully removed!");
                }
            })
            .catch(err => console.error(err));
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
                                setSeller={setSeller}
                            />)
                        }
                    </tbody>
                </table>
            </div>
            {
                !!seller &&
                <ConfirmModal
                    title={`Are you sure, you want to remove ${seller.name}?`}
                    modalData={seller}
                    successAction={handleDeleteSeller}
                />
            }
        </div>
    );
};

export default Sellers;