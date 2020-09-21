import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom'; 
import { userContext } from '../Contexts/userContext';

const ProtectedRoute = ({ component:Component, ...rest}) => {

    const Auth = useContext(userContext);
    const { auth } = Auth;
    console.log("Protected Route", auth);

    return(
        <Route
            {...rest}
            render = { ()=> auth ? (
                <Component/>
            ) : (
                <Redirect to="/home"/>
            )}
        />
    );
}

export default ProtectedRoute;