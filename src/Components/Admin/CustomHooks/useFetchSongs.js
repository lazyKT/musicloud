import { useEffect, useState } from 'react';
import axios from 'axios';

export const useFetchSongs = (token) => {

    const [ state, setState ] = useState({data:null,loaded:false});
    useEffect(() => {
        setState({data:null,loaded:false});
        if(token){
        axios.get(`http://127.0.0.1:8000/songs`,{ headers: {"Authorization" : `Bearer ${token}`}})
            .then(response => {
                setState({data:response.data,loaded:true});
            }).catch(error => {
                console.log(error.response);
            });
        }
    },[token]);

    return state;
}