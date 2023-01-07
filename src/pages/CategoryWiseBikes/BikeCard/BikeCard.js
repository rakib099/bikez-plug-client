import React from 'react';
import kidsBike from '../../../assets/images/kids-bike-3.png';
import { HiShieldCheck } from 'react-icons/hi';
import { BsCheckCircleFill } from 'react-icons/bs';

const BikeCard = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={kidsBike} alt="Bike" className='max-w-full h-auto' /></figure>
            <div className="card-body">
                <div className="">
                    <h2 className="card-title">
                        Girls Baby Bicycle Blue
                    </h2>
                    <div className="flex justify-between">
                        <p className="flex items-center gap-2">
                            <span className='text-gray-500'>Elena Gilbert</span>
                            <BsCheckCircleFill title='Verified Seller' className='text-primary text-lg cursor-pointer' />
                        </p>
                        {/* <p className='text-end text-[#707676]'>Posted {formattedToday}</p> */}
                    </div>
                </div>
                <div className="bg-[#E8F4FF] p-2 rounded-lg">
                    <div className="flex justify-between">
                        <p>Condition: <span className='text-gray-400 font-semibold'>Excellent</span></p>
                        <p className='text-end'>Resale Price: <span className='text-gray-400 font-semibold'>$100</span></p>
                    </div>
                    <div className="flex justify-between">
                        <p>Used: <span className='text-gray-400 font-semibold'>{'04'} years</span></p>
                        <p className='text-end'>Original Price: <span className='text-gray-400 font-semibold'>$150</span></p>
                    </div>
                </div>
                <div className="card-actions justify-between mt-4">
                    <div className="badge badge-outline">{"Jatrabari, Dhaka, Bangladesh"}</div>
                    <div className="badge badge-outline">{formattedToday}</div>
                </div>
            </div>
        </div>
    );
};

export default BikeCard;