import {useState, useEffect} from 'react';
import axios from 'axios';

export const useFetchUser = (id, token) => {
    const [state, setState] = useState({data:null, loading:true})

    useEffect(()=>{
        setState(state => ({state: state.data, loading: true}));
        axios.get(`http://127.0.0.1:8000/user/${id}`,{ headers: {"Authorization" : `Bearer ${token}`}})
            .then(resp => {
                console.log(resp);
                const data = resp.data;
                setState({data,loading:false})
            });
    },[id,token]);

    return state;

}