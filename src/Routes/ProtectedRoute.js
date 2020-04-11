import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom'; 
import { userContext } from '../Contexts/userContext';

const ProtectedRoute = ({ component:Component, ...rest}) => {

    const Auth = useContext(userContext);
    console.log(Auth.auth);

    return(
        <Route
            {...rest}
            render = { ()=> Auth.auth ? (
                <Component/>
            ) : (
                <Redirect to="/about"/>
            )}
        />
    );
}

export default ProtectedRoute;