import React, { Children } from 'react'
import { UrlState } from '../Contextapi'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';


const Require = ({ children }) => {
    const navigate = useNavigate();
    const { isAuthenticated, loading } = UrlState();
    if (!isAuthenticated && loading===false) {
        navigate('/auth');
    }
    if(loading){
        return (<Loading/>)
    }
    if(isAuthenticated){
        return children;
    }
}

export default Require
