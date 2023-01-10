import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './CheckoutForm.css';
import React, { useState } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { toast } from 'react-hot-toast';

const CheckoutForm = ({ clientSecret, booking }) => {
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const { _id, bikeId, price, name, email } = booking;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setCardError('');
        }

        setSuccess('');
        setProcessing(true);

        stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: name,
                    email: email
                },
            },
        })
            .then(function (result) {
                console.log(result.error || result.paymentIntent);
                // if error occurs
                if (result.error) {
                    setProcessing(false);
                    setCardError(result.error.message);
                    return;
                }
                // if payment succeeded
                if (result.paymentIntent?.status === "succeeded") {

                    // store payment info in the database
                    const payment = {
                        price,
                        bookingId: _id,
                        bikeId,
                        transactionId: result.paymentIntent.id,
                        email
                    }

                    fetch('http://localhost:5000/payments', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(payment)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.insertedId) {
                                setSuccess('Congrats! Your payment has been completed');
                                toast.success('Payment Successfully Completed!')
                                setTransactionId(result.paymentIntent.id);
                                setProcessing(false);
                            }
                        })
                }
            });

    }

    return (
        <>
            <form className='payment-form' onSubmit={handleSubmit}>
                <CardElement
                    className='border bottom-4'
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-primary btn-sm mt-4' type="submit" disabled={processing || !stripe || !clientSecret}>
                    Pay
                </button>
            </form>
            {
                processing ?
                    <Spinner />
                    :
                    <>
                        <p className="text-error mt-3">{cardError}</p>
                        {
                            success && <div className='mt-3'>
                                <p className='text-green-500'>{success}</p>
                                <p>Your TransactionId: <span className='font-bold'>{transactionId}</span></p>
                            </div>
                        }
                    </>
            }
        </>
    );
};

export default CheckoutForm;