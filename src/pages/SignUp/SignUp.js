import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const SignUp = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [createdUserEmail, setCreatedUserEmail] = useState('');

    const handleSignUp = (data, e) => {
        console.log(data);
        const { name, email, password, userType } = data;

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                updateAndSaveUserToDB(name, email, userType);
            })
            .catch(err => console.error(err));
        e.target.reset();
    }

    // user info updating function
    const updateAndSaveUserToDB = (name, email, userType) => {
        const updateInfo = {
            displayName: name
        }

        updateUserProfile(updateInfo)
            .then(() => {
                console.log('profile updated');
                const user = { name, email, userType}; // for DB
                saveUserToDB(user);
            })
            .catch(err => console.error(err));
    }

    // Saving user to DB function
    const saveUserToDB = (user) => {
        axios.post('http://localhost:5000/users', user)
          .then(function (data) {
            console.log(data);
            if (data.data.acknowledged) {
                toast.success('Sign up successful! You may login now.');
                setCreatedUserEmail(user.email);
            }
          })
          .catch(function (error) {
            console.error(error);
          });
    }

    return (
        <div className='flex justify-center items-center'>
            <div className='shadow-[3px_4px_10px_2px_rgba(0,0,0,0.05)] w-4/6 lg:w-1/4 p-6 rounded-lg bg-slate-100 mt-5 mb-12'>
                <h3 className='text-xl text-center font-semibold'>Sign Up</h3>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register('name', { required: 'Name is required' })} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-error' role="alert">{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register('email', { required: 'Email is required' })} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-error' role="alert">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register('password', {
                            required: 'Password is required',
                            minLength: { value: 6, message: 'Password must be at least 6 characters long' },
                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must contain at least 1 uppercase, 1 special character and 1 number' }
                        })} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-error' role="alert">{errors.password?.message}</p>}
                    </div>
                    <div className="w-full max-w-xs mb-4">
                        <label className="label">
                            <span className="label-text">User type:</span>
                        </label>
                        <div className="flex gap-4">
                            <div className="ml-1 flex gap-2">
                                <input type="radio" id="buyer" value="Buyer" defaultChecked {...register('userType')} />
                                <label htmlFor="buyer">Buyer</label>
                            </div>
                            <div className="ml-1 flex gap-2">
                                <input type="radio" id="seller" value="Seller" {...register('userType')} />
                                <label htmlFor="seller">Seller</label>
                            </div>
                        </div>
                    </div>

                    <input className='btn border-none w-full bg-[#1257be] hover:bg-blue-700 mb-2' type="submit" value="Login" />
                </form>
                <p className='text-sm'>New to this website? <Link to='/signup' className='text-[#1257be]'>Create an Account</Link></p>
                <div className="divider">OR</div>
                <button className="btn btn-outline  hover:bg-[#1257be] w-full"><FcGoogle /> <span className='ml-3'>Continue With Google</span></button>
            </div>
        </div>
    );
};

export default SignUp;