import React, { useReducer } from 'react';
import Button from '@material-ui/core/Button';
import '../../App.css';
import { ChangePwd } from './ChangePwd';


function init() {
    return ({
        changepwd: false
    })
} 


function reducer(state, action) {
    switch(action.type) {
        case 'change':
            return {...state, changepwd: true};
        case 'cancel':
            return {...state, changepwd: false};
        default:
            throw new Error();
    }
}


export function Security() {

    const [ state, dispatch ] = useReducer(reducer, init);

    const changePwdClick = () => {
        dispatch({type: 'change'});
    };

    const cancelPwdClick = () => {
        dispatch({type: 'cancel'});
    }

    return (
        <>
            <div className="secDiv">
                <div className="subDiv">
                    <h4>Change Password</h4>
                    <div className="changePwdDiv">
                        { state.changepwd ? 
                            (<ChangePwd cancelPwdClick={cancelPwdClick}/>) :
                            (<Button variant="outlined"  className="changePwdBtn"
                            onClick={changePwdClick} >
                            Change Password
                            </Button>)
                        }                       
                    </div>
                </div>
                <div className="subDiv">
                    <h4>Logout from all other devices</h4>
                    <Button variant="outlined">Logout other Sessions</Button>
                </div>
                <div className="subDiv">
                    <h4>Deactivate account</h4>
                    <a>Deactivate account</a>
                </div>
                <div className="subDiv">
                    <h4>Delete account</h4>
                    <a>Delete account</a>
                </div>
            </div>
        </>
    );
}