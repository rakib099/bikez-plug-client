import React from 'react';

const SelectPurchaseYear = ({register}) => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 1999; i <= currentYear; i++) {
        years.push(i);
    }

    return (
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">Year of Purchase</span>
            </label>
            <select {...register('purchaseYear')} className="select select-bordered" defaultValue='2023'>
                {
                    years.map(year => <option
                        key={year}
                        value={year}
                    >{year}</option>)
                }
            </select>
        </div>
    );
};

export default SelectPurchaseYear;