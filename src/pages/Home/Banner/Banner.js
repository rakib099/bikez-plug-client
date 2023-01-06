import React from 'react';
import { Link } from 'react-router-dom';
import bannerImg from '../../../assets/images/pexels-andrea-2.png';
import './Banner.css';

const Banner = () => {

    return (
        <div className="banner mb-6">
            <div id={`slide1`} className="carousel-item relative w-full">
                <div className='carousel-img ml-auto'>
                    <img src={bannerImg} alt="carousel-img" className="rounded-lg" />
                </div>
                {/* Title */}
                <div className="absolute justify-end transform -translate-y-1/2 left-24 top-1/3 hidden lg:flex">
                    <h1 className='text-6xl font-bold text-white leading-[1.3]'>
                        Happiness is <br />
                        When you can buy <br />
                        Or sell from the <br />
                        Comfort of your <br />
                        home.
                    </h1>
                </div>
                <p className="text-xl font-semibold absolute top-1/4 text-center text-white lg:hidden px-7">Happiness is when you can buy or sell from the convenience of your home.</p>

                <div className="absolute flex justify-start transform -translate-y-1/2 lg:w-2/5 left-24 top-3/4">
                    <a href='#categories'>
                        <button className="btn btn-outline text-white hover:bg-violet-700 mr-5">Explore Now ❯</button>
                    </a>
                </div>

            </div>
        </div>
    );
};

export default Banner;