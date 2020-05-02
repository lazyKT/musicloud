import { useEffect, useState } from 'react';
import axios from 'axios';

export const useFetchGenres = (token, url) => {

    const [ state, setState ] = useState({data:null,loaded:false});
    useEffect(() => {
        setState({data:null,loaded:false});
        if(token){
        axios.get(url, { headers: {"Authorization" : `Bearer ${token}`}})
            .then(response => {
                console.log(response);
                setState({data:response.data,loaded:true});
            }).catch(error => {
                console.log(error.response);
            });
        }
    },[token]);

    return state;
}