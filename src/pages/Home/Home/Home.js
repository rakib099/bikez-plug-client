import React from 'react';
import ProductCategories from '../ProductCategories/ProductCategories';

const Home = () => {
    return (
        <div className='mx-5'>
            <h2>Banner</h2>
            {
                // advertised && unsold
                // <AdvertisedSection />
            }
            <ProductCategories />
        </div>
    );
};

export default Home;