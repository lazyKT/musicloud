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

    useEffect(()=>{
        // setErrorTimeOut();
        let errorTimeOut = null;
        let timeOut = 0;

        errorTimeOut = setInterval(timeoutFunc, 1000);
        function timeoutFunc() {
            if (timeOut <= 5)
                timeOut++;
            else {
                clearInterval(errorTimeOut);
                setError(true);
            }
        }

        return (
            errorTimeOut &&
            clearInterval(errorTimeOut)
        );
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