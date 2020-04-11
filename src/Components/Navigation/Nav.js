import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../Contexts/userContext';
import { PublicNav } from './PublicNav';
import { AdminNav } from './AdminNav';
import { UesrNav } from './UserNav';
import Cookies from 'js-cookie';
import '../../App.css';

export const Nav = () => {

    //console.log(props);

    const Auth = useContext(userContext);
    const [ type, setType ] = useState('');

    useEffect(()=>{
        const tokens = Cookies.get("tokens");
        if(tokens){
            setType(JSON.parse(tokens).role);
        }
    });

    return(
        <nav className="navigation">
            {
                Auth.auth ? 
                (
                    type && type === "admin" ?
                    <AdminNav/> :
                    <UesrNav/>
                ):
                <PublicNav/>
            }
        </nav>
    );
}