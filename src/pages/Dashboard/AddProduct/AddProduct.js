import React from 'react';
import SelectLocation from './SelectLocation';

const AddProduct = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 1999; i <= currentYear; i++) {
        years.push(i);
    }

    return (
        <div>
            <h3 className='text-2xl font-semibold text-center mb-4'>Add a Product</h3>
            <div className='bg-gray-100 p-7'>
                <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Product Category</span>
                            </label>
                            <select className="select select-bordered" defaultValue='Mountain Bikes'>
                                <option value='Mountain Bikes'>Mountain Bikes</option>
                                <option value='Road Bikes'>Road Bikes</option>
                                <option value='Kids Bikes'>Kids Bikes</option>
                            </select>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Condition</span>
                            </label>
                            <select className="select select-bordered" defaultValue='Excellent'>
                                <option value='Excellent'>Excellent</option>
                                <option value='Good'>Good</option>
                                <option value='Fair'>Fair</option>
                            </select>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Resale Price</span>
                            </label>
                            <input type="number" placeholder="Type here" min='20' className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Original Price</span>
                            </label>
                            <input type="number" placeholder="Type here" min='20' className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Year of Purchase</span>
                            </label>
                            <select className="select select-bordered" defaultValue='2023'>
                                {
                                    years.map(year => <option
                                        key={year}
                                        value={year}
                                    >{year}</option>)
                                }
                            </select>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Mobile No.</span>
                            </label>
                            <input type="number" placeholder="Type here" min='20' className="input input-bordered w-full max-w-xs" />
                        </div>
                        <SelectLocation />
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Upload Image</span>
                                <span className="label-text-alt">Size: 500 x 292</span>
                            </label>
                            <input type="file" className="file-input file-input-bordered file-input-info w-full max-w-xs" />
                        </div>
                    </div>
                    <input type="submit" value="Add" className="btn btn-info border-none mt-4" />
                </form>
            </div>
        </div>
    );
};

export default AddProduct;