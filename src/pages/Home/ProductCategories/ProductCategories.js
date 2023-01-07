import React from 'react';
import mountain from '../../../assets/images/mountain-bikes.png';
import road from '../../../assets/images/road-bikes.png';
import kids from '../../../assets/images/kids-bikes.png';
import CategoryCard from './CategoryCard';
import categoryCardData from '../../../utils/categoryCardData';

const ProductCategories = () => {
    
    return (
        <div id='categories' className='mb-20 lg:pt-2'>
            <h3 className=" text-2xl font-bold text-center mb-5">What are you looking for?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-0">
                {
                    categoryCardData.map(card => <CategoryCard
                        key={card.id}
                        card={card}
                    />)
                }
            </div>
        </div>
    );
};

export default ProductCategories;