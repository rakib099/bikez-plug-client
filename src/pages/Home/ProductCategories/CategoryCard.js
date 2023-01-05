import React from 'react';

const CategoryCard = ({card}) => {
    return (
        <div className="card bg-base-100">
            <figure><img className='w-2/3' src={card.img} alt="Shoes" /></figure>
            <div className="mt-3">
                <h2 className="font-semibold text-xl flex justify-center items-center gap-3">
                    {card.text}
                    {card.text === 'Kids Bikes' && <div className="badge badge-secondary badge-sm">NEW</div>}
                </h2>
                {/* <div className="card-actions justify-end">
                    <div className="badge badge-outline">Fashion</div>
                    <div className="badge badge-outline">Products</div>
                </div> */}
            </div>
        </div>
    );
};

export default CategoryCard;