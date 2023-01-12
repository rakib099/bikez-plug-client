import React from 'react';
import useTitle from '../../../hooks/useTitle';
import AdvertisedItems from '../AdvertisedItems/AdvertisedItems';
import Banner from '../Banner/Banner';
import ExchangeOffer from '../ExchangeOffer/ExchangeOffer';
import ProductCategories from '../ProductCategories/ProductCategories';

const Home = () => {
    useTitle('Home');

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