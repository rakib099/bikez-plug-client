import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Spinner from '../../../components/Spinner/Spinner';
import ConfirmModal from '../../Shared/ConfirmModal/ConfirmModal';
import BuyersRow from './BuyersRow';

const Buyers = () => {
    const [buyer, setBuyer] = useState(null);
    const { data: buyers, isLoading, refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            const res = await fetch('https://bikez-plug-server.vercel.app/users/buyers', {
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

    const handleDeleteBuyer = ({_id}) => {
        fetch(`https://bikez-plug-server.vercel.app/buyers/${_id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.deletedCount) {
                setBuyer(null);
                refetch();
                toast.success("Buyer successfully removed!");
            }
        })
        .catch(err => console.error(err));
    }

    return (
        <div>
            <h3 className='text-2xl font-semibold text-center mb-4'>All Buyers</h3>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buyers.map((buyer, idx) => <BuyersRow
                                key={buyer._id}
                                buyer={buyer}
                                idx={idx}
                                setBuyer={setBuyer}
                            />)
                        }
                    </tbody>
                </table>
            </div>
            {
                !!buyer && 
                <ConfirmModal 
                    title={`Are you sure, you want to remove ${buyer.name}`}
                    modalData={buyer}
                    successAction={handleDeleteBuyer}
                />
            }
        </div>
    );
};

export default Buyers;