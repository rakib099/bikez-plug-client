import React from 'react';
import { useLoaderData } from 'react-router-dom';
import BikeCard from '../BikeCard/BikeCard';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../../components/Spinner/Spinner';

const CategoryWiseBikes = () => {
    const category = useLoaderData();
    const { _id, title } = category;
    console.log(title)

    const { data: bikes, isLoading } = useQuery({
        queryKey: ['bikes', _id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/bikes/category/${_id}`);
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
                    />) 
                }
            </div>
        </div>
    );
};

export default CategoryWiseBikes;