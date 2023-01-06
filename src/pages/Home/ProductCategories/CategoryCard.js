import React from 'react';
import {Link} from 'react-router-dom';

const CategoryCard = ({card}) => {
    const style = {
        transition: "all .5s ease"
    }

    return (
        <div className="card bg-base-100">
            <Link to='/blogs'><figure>
                <img style={style} className='w-2/3' src={card.img} alt="category" />
            </figure></Link>
            <div className="mt-3">
                <h2 className="font-semibold text-xl flex justify-center items-center gap-3">
                    <Link to='/blogs'>{card.text}</Link>
                    {card.text === 'Kids Bikes' && <div className="badge badge-secondary badge-sm">NEW</div>}
                </h2>
            </div>
        </div>
    );
};

export default CategoryCard;