import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Spinner from '../../../components/Spinner/Spinner';
import BuyersRow from './BuyersRow';

const Buyers = () => {
    const { data: buyers, isLoading } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users/buyers', {
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
            <h3 className='text-2xl font-semibold text-center mb-4'>All Buyers</h3>
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
                            buyers.map((buyer, idx) => <BuyersRow
                                key={buyer._id}
                                buyer={buyer}
                                idx={idx}
                            />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Buyers;