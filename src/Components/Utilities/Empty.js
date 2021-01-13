/**
 * This component is to indicate empty songs
 */
import React from 'react';
import empty from '../../Imgs/empty.png';
import './Utility.css';


function Empty({prop}) {

    return (
        <div className="empty-container">
            <img src={empty} alt="empty"/>
            <p onClick={prop}>
                Add somethig new or COOL:D?
            </p>
        </div>
    )
}


export default Empty;
