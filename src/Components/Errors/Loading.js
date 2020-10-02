/** This component is to display during the network delay */
import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';

import ConnectionTimeOut from './408';


const styles = {
    div: {
        width: "400px",
        display: "block",
        margin: "auto"
    },
    loader: {
        display: 'block',
        width: 'fit-content',
        margin: "auto"
    },
    msg: {
        width: "fit-content",
        margin: "auto"
    }
}

export default function Loading({ msg }) {

    const [ error, setError ] = useState(false);

    const setErrorTimeOut = () => {
        let timeout = 0;
        let func = setInterval(errorTimeout, 1000);
        function errorTimeout() {
            if (timeout <= 1)
                timeout++;
            else {
                clearInterval(func);
                setError(true);
            }
        }
    }

    useEffect(()=>{
        setErrorTimeOut();
    },[]);

    return (
        <div style={styles.div}>
            { error ? 
              <ConnectionTimeOut/> 
              : (<div>
                <Loader 
                style={styles.loader} 
                type="TailSpin"
                />
                <p style={styles.msg}>
                    { `${msg} ...` }
                </p>
            </div>)
            }
        </div>
    )
}