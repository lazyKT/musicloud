import React, { useContext } from 'react';
import { userContext } from '../Contexts/userContext';
import { Route, Redirect } from 'react-router-dom';

const ProtectedLogin = ({component:Component, ...rest}) => {
    const Auth = useContext(userContext);

    return(
        <Route
            {...rest}
            render={() => !Auth.auth ? (
                <Component/>
            ):(
                <Redirect to="/dashboard"/>
            )}
        />
    );
}

export default ProtectedLogin;