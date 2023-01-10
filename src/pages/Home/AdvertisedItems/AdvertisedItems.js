import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Spinner from '../../../components/Spinner/Spinner';
import { AuthContext } from '../../../contexts/AuthProvider';
import BikeCard from '../../CategoryWiseBikes/BikeCard/BikeCard';
import BookingModal from '../../CategoryWiseBikes/BookingModal/BookingModal';

const AdvertisedItems = () => {
    const { user, bookingInfo, setBookingInfo } = useContext(AuthContext);
    const { data: bikes, isLoading } = useQuery({
        queryKey: ['bikes'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/bikes/advertised`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Spinner />
    }

    // Don't show Advertised section, if there is not items advertised
    if (!bikes.length) {
        return;
    }

    return (
        <div className='mb-10'>
            <h3 className="text-2xl font-semibold text-center mb-6">Advertised Items</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                    bikes.map(bike => <BikeCard
                        key={bike._id}
                        bike={bike}
                        setBookingInfo={setBookingInfo}
                    />)
                }
            </div>
            {
                !!bookingInfo && !!user &&
                <BookingModal 
                    bookingInfo={bookingInfo}
                    setBookingInfo={setBookingInfo}
                />
            }
        </div>
    );
};

export default AdvertisedItems;