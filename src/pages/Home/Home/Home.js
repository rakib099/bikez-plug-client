import React from 'react';
import Banner from '../Banner/Banner';
import ExchangeOffer from '../ExchangeOffer/ExchangeOffer';
import ProductCategories from '../ProductCategories/ProductCategories';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner />
            {
                // advertised && unsold
                // <AdvertisedSection />
            }
            <ProductCategories />
            <ExchangeOffer />
        </div>
    );
};

export default Home;