import React from 'react';

const SelectLocation = () => {
    return (
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">Location</span>
            </label>
            <select className="select select-bordered" defaultValue='Dhaka, Bangladesh'>
                <option value='Dhaka, Bangladesh'>Dhaka, Bangladesh</option>
                <option value='Faridpur, Dhaka, Bangladesh'>Faridpur, Dhaka, Bangladesh</option>
                <option value='Faridpur, Dhaka, Bangladesh'>Uttara, Dhaka, Bangladesh</option>
                <option value='Faridpur, Dhaka, Bangladesh'>Jatrabari, Dhaka, Bangladesh</option>
                <option value='Chittagong, Bangladesh'>Chittagong, Bangladesh</option>
                <option value='Sylhet, Bangladesh'>Sylhet, Bangladesh</option>
                <option value='Moulvibazar, Sylhet, Bangladesh'>Moulvibazar, Sylhet, Bangladesh</option>
                <option value='Rajshahi, Bangladesh'>Rajshahi, Bangladesh</option>
                <option value='Khulna, Bangladesh'>Khulna, Bangladesh</option>
                <option value='Jessore, Khulna, Bangladesh'>Jessore, Khulna, Bangladesh</option>
                <option value='Bagerhat, Khulna, Bangladesh'>Bagerhat, Khulna, Bangladesh</option>
                <option value='Mymenssingh, Bangladesh'>Mymenssingh, Bangladesh</option>
                <option value='Rangpur, Bangladesh'>Rangpur, Bangladesh</option>
                <option value='Barisal, Bangladesh'>Barisal, Bangladesh</option>
            </select>
        </div>
    );
};

export default SelectLocation;