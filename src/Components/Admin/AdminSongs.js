import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useFetchSongs } from './CustomHooks/useFetchSongs';
import Cookies from 'js-cookie';

const AdminSongs = () => {

    const [ token, setToken ] = useState(null);

    const { data, loaded } = useFetchSongs(token);

    const getCookies = () => {
        const user = Cookies.get("user");
        const tokens = Cookies.get("tokens");
        if(user && tokens){
            setToken(JSON.parse(tokens).access_token);
        }
    }

    useEffect(() => {
        getCookies();
    })

    return(
        <>
            { loaded ? 
            (<div>
                <h3>Song Data</h3>
                { JSON.stringify(data) }
            </div>)
            : "Loading Data"
            }
        </>
    );
}

export default withRouter(AdminSongs);