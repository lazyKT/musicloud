/** This component is to display during the network delay */
import React from 'react';
import Loader from 'react-loader-spinner';


export default function Loading({ msg }) {

    return (
        <div>
            <Loader type="TailSpin"/>
            <p>{ `${msg} ...` }</p>
        </div>
    )
}