import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import AdminDashboard from './AdminDashboard';
import { UserDashboard } from './UserDashboard';


/** 
 * this component renders as soon as the user login successfully
 * If the user is an admin, it directs the user to admin dashboard
 * If not, to user dashboard
 *  */ 

export function Dashboard() {

    const [ userType, setUserType ] = useState(null);

    useEffect(() => {
        const user = JSON.parse(Cookies.get("tokens"));
        setUserType(user.role);
    },[])

    return(
        <div>
            { userType === 'admin' ? 
                <AdminDashboard/> :
                <UserDashboard/>
            }
        </div>
    );
}