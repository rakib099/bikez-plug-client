import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../../contexts/AuthProvider';
import getFormattedToday from '../../../utils/getFormattedToday';
import SelectLocation from './SelectLocation';
import SelectPurchaseYear from './SelectPurchaseYear';
import { BsArrowRight } from 'react-icons/bs'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();
    const imgHostKey = process.env.REACT_APP_imgbb_key;
    const currentDate = getFormattedToday();



    const handleAddProduct = (data, e) => {
        setProcessing(true);
        const { name, category, condition, resalePrice, originalPrice, purchaseYear, location, mobile, description } = data;
        const image = data.image[0];

        let categoryId;
        if (category === 'Mountain Bikes') {
            categoryId = '63b91e93cf6d241d3e4d39fe';
        }
        else if (category === 'Road Bikes') {
            categoryId = '63b91e93cf6d241d3e4d39ff';
        }
        else if (category === 'Kids Bikes') {
            categoryId = '63b91e93cf6d241d3e4d3a00';
        }


        // uploading image to imgbb
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                console.log(imgData.data.url);
                const bike = {
                    name,
                    img: imgData.data.url,
                    category,
                    categoryId,
                    condition,
                    resalePrice: parseFloat(resalePrice),
                    originalPrice: parseFloat(originalPrice),
                    purchaseYear: parseInt(purchaseYear),
                    location,
                    postedOn: currentDate,
                    seller: user?.displayName,
                    sellerEmail: user?.email,
                    mobile,
                    status: "unsold",
                    advertised: false,
                    description,
                    reported: false
                }
                saveBikeToDB(bike);
            })
            .catch(err => console.error(err));


        const saveBikeToDB = (bike) => {
            fetch('https://bikez-plug-server.vercel.app/bikes', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(bike)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        e.target.reset();
                        setProcessing(false);
                        navigate('/dashboard/my-products');
                        toast.success('Product added successfully!');
                    }
                })
                .catch(err => console.error(err));
        }
    }



    return (
        <div>
            <h3 className='text-2xl font-semibold text-center mb-4'>Add a Product</h3>
            <div className='bg-gray-100 p-7'>
                <form onSubmit={handleSubmit(handleAddProduct)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input type="text" {...register('name', { required: 'Required field' })} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                            {errors.name && <p className='text-error' role="alert">{errors.name?.message}</p>}
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Product Category</span>
                            </label>
                            <select {...register('category')} className="select select-bordered" defaultValue='Mountain Bikes'>
                                <option value='Mountain Bikes'>Mountain Bikes</option>
                                <option value='Road Bikes'>Road Bikes</option>
                                <option value='Kids Bikes'>Kids Bikes</option>
                            </select>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Condition</span>
                            </label>
                            <select {...register('condition')} className="select select-bordered" defaultValue='Excellent'>
                                <option value='Excellent'>Excellent</option>
                                <option value='Good'>Good</option>
                                <option value='Fair'>Fair</option>
                            </select>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Resale Price</span>
                            </label>
                            <input type="number" {...register('resalePrice', { required: 'Required field' })} placeholder="Type here" min='20' className="input input-bordered w-full max-w-xs" />
                            {errors.resalePrice && <p className='text-error' role="alert">{errors.resalePrice?.message}</p>}
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Original Price</span>
                            </label>
                            <input type="number" {...register('originalPrice', { required: 'Required field' })} placeholder="Type here" min='20' className="input input-bordered w-full max-w-xs" />
                            {errors.originalPrice && <p className='text-error' role="alert">{errors.originalPrice?.message}</p>}
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Upload Image</span>
                                <span className="label-text-alt">Size: 500 x 292</span>
                            </label>
                            <input type="file" {...register('image', { required: 'Required field' })} className="file-input file-input-bordered file-input-error w-full max-w-xs" />
                            {errors.image && <p className='text-error' role="alert">{errors.image?.message}</p>}
                        </div>
                        <SelectPurchaseYear register={register} />
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Mobile No.</span>
                            </label>
                            <input type="number" {...register('mobile', { required: 'Required field' })} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                            {errors.mobile && <p className='text-error' role="alert">{errors.mobile?.message}</p>}
                        </div>
                        <SelectLocation register={register} />
                    </div>
                    <div className="">
                        <div className="lg:w-1/2">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea {...register('description')} className="textarea textarea-bordered h-24" placeholder="Type here"></textarea>
                            </div>
                        </div>
                    </div>



                    <div className="flex items-end justify-center">
                        {
                            processing ?
                                <button className="btn loading w-full md:max-w-xs bg-blue-500 hover:bg-blue-600 border-none lg:h-16 mt-5"></button>
                                :
                                <button type="submit" className="btn w-full md:max-w-xs bg-blue-500 hover:bg-blue-600 border-none lg:h-16 mt-5">
                                    Add Product &nbsp;
                                    <BsArrowRight className='hidden lg:block' />
                                </button>
                        }

                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddProduct;