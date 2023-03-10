import React, { useState, useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import BikeCard from '../BikeCard/BikeCard';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../../components/Spinner/Spinner';
import BookingModal from '../BookingModal/BookingModal';
import { AuthContext } from '../../../contexts/AuthProvider';
import useTitle from '../../../hooks/useTitle';

const CategoryWiseBikes = () => {
    const category = useLoaderData();
    const {user, bookingInfo, setBookingInfo} = useContext(AuthContext);
    
    const { _id, title } = category;
    useTitle(title);

    const { data: bikes, isLoading, refetch } = useQuery({
        queryKey: ['bikes', _id],
        queryFn: async () => {
            const res = await fetch(`https://bikez-plug-server.vercel.app/bikes/category/${_id}`);
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Spinner />;
    }


    return (
        <div className={`px-5 lg:px-8 mt-3 pb-20 pt-3`}>
            <h3 className="text-3xl font-semibold text-center mb-7">
                {title}
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                   bikes.map(bike => <BikeCard 
                    key={bike._id} 
                    bike={bike}
                    setBookingInfo={setBookingInfo}
                    refetch={refetch}
                    />) 
                }
            </div>
            {
                !!bookingInfo && !!user &&
                <BookingModal 
                    bookingInfo={bookingInfo}
                    setBookingInfo={setBookingInfo}
                />
            }
        </div>
    );
};

export default CategoryWiseBikes;