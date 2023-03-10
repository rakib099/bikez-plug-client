import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useTitle from '../../hooks/useTitle';
import useToken from '../../hooks/useToken';

const Login = () => {
    useTitle('Login');
    const { signIn, googleLogin } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginLoading, setLoginLoading] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [firebaseError, setFirebaseError] = useState('');
    const [token] = useToken(userEmail);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
            window.location.reload();
        }

    }, [token, navigate, from]);

    // handle Login event handler
    const handleLogin = (data, e) => {
        const { email, password } = data;
        setFirebaseError('')
        setLoginLoading(true);

        signIn(email, password)
            .then(result => {
                const user = result.user;
                // console.log(user);
                setUserEmail(user.email);
                setLoginLoading(false);
                e.target.reset();
            })
            .catch(err => {
                console.error(err)
                setFirebaseError(err.message);
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
                fetch('https://bikez-plug-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        setUserEmail(user.email);
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    }

    return (
        <div className='lg:h-[37rem] flex justify-center items-center'>
            <div className='shadow-[3px_4px_10px_2px_rgba(0,0,0,0.05)] lg:w-1/4 p-6 rounded-lg bg-slate-100 my-5 lg:my-0'>
                <h3 className='text-xl text-center font-semibold'>Login</h3>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register('email', { required: 'Email is required' })} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-error' role="alert">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs mb-4">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register('password', {
                            required: 'Password is required',
                            minLength: { value: 6, message: 'Password must be at least 6 characters long' }
                        })} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-error' role="alert">{errors.password?.message}</p>}
                    </div>
                    <p className="text-error mb-2">{firebaseError}</p>
                    {
                        !!loginLoading ?
                            <button className='btn border-none w-full bg-[#1257be] hover:bg-blue-700 mb-2 loading'>Loading</button>
                            :
                            <input className='btn border-none w-full bg-[#1257be] hover:bg-blue-700 mb-2' type="submit" value="Login" />
                    }
                </form>
                <p className='text-sm'>New to this website? <Link to='/signup' className='text-[#1257be]'>Create an Account</Link></p>
                <div className="divider">OR</div>
                <button onClick={handleGoogleLogin} className="btn btn-outline  hover:bg-slate-600 w-full"><FcGoogle /> <span className='ml-3'>Continue With Google</span></button>
            </div>
        </div>
    );
};

export default Login;