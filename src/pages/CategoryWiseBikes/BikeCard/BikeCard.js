import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { BsCheckCircleFill } from 'react-icons/bs';
import { AuthContext } from '../../../contexts/AuthProvider';
import useVerification from '../../../hooks/useVerification';
import getFormattedToday from '../../../utils/getFormattedToday';

const BikeCard = ({ bike, setBookingInfo }) => {
    const { user } = useContext(AuthContext);
    const { name, img, condition, resalePrice, originalPrice,
        purchaseYear, location, postedOn, seller, sellerEmail } = bike;

    const [isSellerVerified] = useVerification(sellerEmail);

    const currentYear = new Date().getFullYear();
    const yearsUsed = currentYear - purchaseYear;

    const handleBookNow = () => {
        if (!user) {
            return toast.error("Please login to book this product");
        }
        setBookingInfo(bike);
    }

    return (
        <div className="card bg-base-100 shadow-[3px_4px_10px_2px_rgba(0,0,0,0.05)]">
            <figure><img src={img} alt="Bike" className='max-w-full h-auto' /></figure>
            <div className="card-body p-6">
                <div className="">
                    <h2 className="card-title">
                        {name}
                    </h2>
                    <div className="flex justify-between">
                        <p className="flex items-center gap-2">
                            <span className='text-gray-500'>{seller}</span>
                            {
                                isSellerVerified &&
                                <BsCheckCircleFill title='Verified Seller' className='text-primary text-lg cursor-pointer' />
                            }
                        </p>

                    </div>
                </div>
                <div className="bg-[#E8F4FF] py-3 px-3 rounded-lg mb-2">
                    <div className="flex justify-between mb-3">
                        <p>Condition: <span className={`text-teal-600 font-semibold`}>{condition}</span></p>
                        <p className='text-end'>Resale Price: <span className=' text-sky-600 font-semibold'>${resalePrice}</span></p>
                    </div>
                    <div className="flex justify-between mb-4">
                        <p>Used: <span className='text-gray-400 font-semibold'>{yearsUsed} years</span></p>
                        <p className='text-end'>Original Price: <span className='text-lime-500 font-semibold'>${originalPrice}</span></p>
                    </div>
                    <div className="card-actions justify-between">
                        <div className="badge badge-outline">
                            {location}
                        </div>
                        <div className="badge badge-outline">{postedOn}</div>
                    </div>

                </div>
                <div className="text-center">
                    <label htmlFor="booking-modal" onClick={handleBookNow} className="btn btn-sm btn-secondary hover:btn-primary px-5">Book now</label>
                </div>
            </div>
        </div>
    );
};

export default BikeCard;