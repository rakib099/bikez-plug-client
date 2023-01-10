import React from 'react';
import AdvertisedItems from '../AdvertisedItems/AdvertisedItems';
import Banner from '../Banner/Banner';
import ExchangeOffer from '../ExchangeOffer/ExchangeOffer';
import ProductCategories from '../ProductCategories/ProductCategories';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner />
            <AdvertisedItems />
            <ProductCategories />
            <ExchangeOffer />
        </div>
    );
};

export default Home;