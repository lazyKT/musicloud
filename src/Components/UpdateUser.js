import React from 'react';
import Tick from '../Imgs/tick.png';
import Error from '../Imgs/close.png';
import CloseIcon from '@material-ui/icons/Close';
import '../App.css';

const UpdateUser = props => {

    const { update, onClick, cancelHandler, header, headerType, showHeader, hideHeaderMsg } = props;

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

    const errorHeader = {
        width: "fit-content",
        padding: "5px 10px",
        background: "red",
        fontSize: "13px",
        marginTop: "5px",
        borderRadius: "5px"
    }

    const successHeader = {
        width: "fit-content",
        padding: "5px 10px",
        background: "lightgreen",
        fontSize: "13px",
        marginTop: "5px",
        borderRadius: "5px"
    }

    return(
        <div className="updateField">
            { showHeader ? 
                (<div style={ headerType === "error" ? errorHeader : successHeader }>
                    {header}
                    <CloseIcon style={{ fontSize: 13}} onClick={hideHeaderMsg}/>
                </div>) 
                : null}
            <h4>Username</h4>
            { !update ? <span style={usernameLabel}>{ props.value }</span> :
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