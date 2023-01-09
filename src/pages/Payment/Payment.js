import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom'
import CheckoutForm from './CheckoutForm';
import Spinner from '../../components/Spinner/Spinner';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const [clientSecret, setClientSecret] = useState("");
    const booking = useLoaderData();
    const navigation = useNavigation();
    const { bike, bikeId, price, bookedOn, name, email, _id } = booking;


    useEffect(() => {
        fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret));
    }, [price]);


    if (navigation.state === "loading") {
        return <Spinner />
    }

    return (
        <div className='bg-[#F1F5F9] px-12 pt-12 pb-16'>
            <h3 className=' text-2xl font-bold mb-5'>Payment for {bike}</h3>
            <p className="opacity-75 mb-3">Booked on: {bookedOn}</p>
            <p className="text-xl font-bold">Please pay ${price}</p>
            <div className="w-96 mt-4">
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        booking={{ _id, bikeId, price, name, email }}
                        clientSecret={clientSecret}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;