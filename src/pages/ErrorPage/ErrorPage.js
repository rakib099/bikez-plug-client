import React, { useContext } from 'react';
import { Link, useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const ErrorPage = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const error = useRouteError();

  const handleLogout = () => {
    logOut()
      .then(() => {
        localStorage.removeItem('accessToken');
        navigate('/login')
      })
      .catch(err => console.error(err));
  }

  return (
    <div id="error" className="text-center h-64 flex flex-col justify-center">
      <h2 className='font-semibold text-[teal] text-2xl'>Something went wrong!!!</h2>
      <p className='my-2'>
        <span className='text-red-400'>{error.status} </span>
        <i className='opacity-75'>{error.statusText || error.message}</i>
      </p>
      <p>Return to <Link to='/' className='font-semibold text-indigo-400'>Home</Link> <br /> or <button onClick={handleLogout} className='btn btn-secondary btn-xs text-white'>Log out</button> and <Link to='/login' className='font-semibold text-blue-400 hover:text-blue-500'>Login</Link> again.</p>
    </div>
  );
};

export default ErrorPage;