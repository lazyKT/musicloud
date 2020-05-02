import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export function useCookies() {
    const [ state, setState ] = useState({cookies: null, login: false})
    const user = Cookies.get("user");
    const load = Cookies.get("tokens");

    useEffect(() => {
        
        if(user && load) {
            let cookies = JSON.parse(load);
            
            setState({
                cookies,
                login: true
            })
        }
    },[load])

    // console.log("state",state);
    return state;
}