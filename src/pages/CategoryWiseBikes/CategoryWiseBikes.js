import React from 'react';
import { useLoaderData } from 'react-router-dom';
import categoryCardData from '../../utils/categoryCardData';

const CategoryWiseBikes = () => {
    const title = useLoaderData();
    console.log(title);

    return (
        <div className='mx-5 mt-3 mb-10'>
            <h3 className="text-2xl font-semibold text-center">
                {title.title}
            </h3>
        </div>
    );
};

export default CategoryWiseBikes;