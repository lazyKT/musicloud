import React from 'react';
import Tick from '../Imgs/tick.png';
import Error from '../Imgs/close.png';
import '../App.css';

const UpdateUser = props => {

    const { update, onClick, cancelHandler, inputValue } = props;

    const valid_icon = {
        width: "15px",
        marginRight: "10px",
        marginLeft: "10px"
    }

    const error = {
        color: 'red',
        fontSize: '12px'
    }

    const saveDisable = {
        color: 'grey',
        border: '0.2px solid grey'
    }

    const usernameLabel = {
        width: "100px",
        display: "inline-block"
    }

    return(
        <div className="updateField">
            <h4>Username</h4>
            { !update ? <span style={usernameLabel}>{ inputValue }</span> :
                <input value={ props.value } onChange={props.onChange} />
            }
            { update && props.hasError && <img src={Error} alt="Credit to Flaticon" style={valid_icon} />}
            { !props.hasError && update ? <img src={Tick} alt="Credit to Flaticon" style={valid_icon}/>:null}
            <button className="editbutton" 
                onClick={ update ?  cancelHandler : onClick }>
                { update ? "CANCEL" : "EDIT USERNAME" }
            </button>
            { update && 
                <button disabled={!props.isInputChanged || props.hasError} 
                className="savebutton"
                style={ !props.isInputChanged || props.hasError ? saveDisable : null }
                onClick={ props.saveOnClick }>
                    SAVE
                </button>
            }
            { update && props.hasError && 
                <span style={error}>
                    Username should have at least 4 charactors!
                </span>}
        </div>
    );
}

export default UpdateUser;