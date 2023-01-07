import React from 'react';
import { useLoaderData } from 'react-router-dom';
import BikeCard from '../BikeCard/BikeCard';

const CategoryWiseBikes = () => {
    const title = useLoaderData();
    console.log(title);

    return (
        <div className='mx-5 mt-3 mb-10'>
            <h3 className="text-2xl font-semibold text-center">
                {title.title}
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <BikeCard />
            </div>
        </div>
    );
};

export default CategoryWiseBikes;