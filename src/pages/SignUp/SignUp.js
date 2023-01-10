import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const SignUp = () => {
    const { createUser, updateUserProfile, googleLogin } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [firebaseError, setFirebaseError] = useState('');
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/');
            window.location.reload();
        }

    }, [token, navigate]);

    const handleSignUp = (data, e) => {
        const { name, email, password, userType } = data;
        setFirebaseError('');

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                updateAndSaveUserToDB(name, email, userType);
                e.target.reset();
            })
            .catch(err => {
                console.error(err);
                setFirebaseError(err.message);
            });
    }

    // user info updating function
    const updateAndSaveUserToDB = (name, email, userType) => {
        const updateInfo = {
            displayName: name
        }

        updateUserProfile(updateInfo)
            .then(() => {
                console.log('profile updated');
                const user = { name, email, userType }; // for DB
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
                    toast.success('Sign up successful!');
                    setCreatedUserEmail(user.email);
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    // Google Login
    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const userInfo = result.user;
                const user = {
                    name: userInfo.displayName,
                    email: userInfo.email,
                    userType: "Buyer"
                }
                // saving user to DB
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        setCreatedUserEmail(user.email);

                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    }
    
    return (
        <div className='flex justify-center items-center'>
            <div className='shadow-[3px_4px_10px_2px_rgba(0,0,0,0.05)] lg:w-1/4 p-6 rounded-lg bg-slate-100 mt-5 mb-12'>
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
                    <p className="text-error mb-2">{firebaseError}</p>
                    <input className='btn border-none w-full bg-[#1257be] hover:bg-blue-700 mb-2' type="submit" value="Sign Up" />
                </form>
                <p className='text-sm'>Already have an account? <Link to='/login' className='text-[#1257be]'>Login here.</Link></p>
                <div className="divider">OR</div>
                <button onClick={handleGoogleLogin} className="btn btn-outline  hover:bg-slate-600 w-full"><FcGoogle /> <span className='ml-3'>Continue With Google</span></button>
            </div>
        </div>
    );
};

export default SignUp;