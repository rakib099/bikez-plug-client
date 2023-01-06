import React from 'react';
import './ExchangeOffer.css';
import { FaExchangeAlt } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import exBikes from '../../../assets/images/ex-bikes-removebg.png';

const ExchangeOffer = () => {

    return (
        <div className=' mb-7'>
            <h3 className="text-2xl font-semibold mb-3">Exchange Your Bike for Another Bike</h3>
            <div className='lg:h-44 bg-[#E8F4FF] grid grid-cols-1 lg:flex items-center lg:justify-between gap-6 px-8 py-5 lg:pr-10 relative rounded-lg'>
                <div className='flex flex-col lg:flex-row items-center justify-center lg:justify-start'>
                    <img src={exBikes} alt="" />
                    <div className=''>
                        <FaExchangeAlt className='text-3xl text-gray-400' />
                    </div>
                    <img src={exBikes} alt="" className='flip-img hidden lg:block' />
                </div>
                <div>
                    <h3 className="text-xl font-medium mb-2">Get Best Price for Your Used Bike</h3>
                    <p className="text-xl text-slate-400">When you exchange it for another new <br className='hidden lg:block' />or used bike at Bikez Plug.</p>
                </div>
                <div className='mx-auto lg:mx-0'>
                    <button className="btn btn-info text-white flex items-center gap-2">
                        Get Instant Quote
                        <BsArrowRight className='font-bold' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExchangeOffer;