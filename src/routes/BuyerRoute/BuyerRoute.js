import React, {useContext} from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { AuthContext } from '../../contexts/AuthProvider';
import useBuyer from '../../hooks/useBuyer';
import {useLocation, Navigate} from 'react-router-dom';

const BuyerRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isBuyer, isBuyerLoading] = useBuyer(user?.email);
    let location = useLocation();

    if (loading || isBuyerLoading) {
        return <Spinner />
    }

    if (isBuyer) {
        return children;
    }
    
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default BuyerRoute;