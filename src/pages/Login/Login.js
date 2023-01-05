import React from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import {Link} from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLogin = (data, e) => {
        console.log(data);

        e.target.reset();
    }

    return (
        <div className='lg:h-[37rem] flex justify-center items-center'>
            <div className='shadow-[3px_4px_10px_2px_rgba(0,0,0,0.05)] w-4/6 lg:w-1/4 p-6 rounded-lg bg-slate-100 my-5 lg:my-0'>
                <h3 className='text-xl text-center font-semibold'>Login</h3>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register('email', {required: 'Email is required'})} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-error' role="alert">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs mb-4">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register('password', {required: 'Password is required', 
                        minLength: {value: 6, message: 'Password must be at least 6 characters long'}})} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-error' role="alert">{errors.password?.message}</p>}
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

export default Login;