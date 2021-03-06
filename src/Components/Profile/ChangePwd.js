import React, { useReducer, useContext } from 'react';
import { tokenRefresh, changePwd } from './Utils/ChangePassword';
import { logoutOpr } from '../Admin/CrudFunctions/Data';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import '../../App.css';
import { userContext } from '../../Contexts/userContext';
import Cookies from 'js-cookie';


function init(){
    return ({
        currentPwd: null,
        pwd1: null,
        pwd2: '',
        validpwd1: false,
        validpwd2: false,
        submit: false,
        logout: false,
        logoutToken: null
    })
}

function reducer(state, action) {
    switch(action.type) {
        case ('current'):
            return {...state, currentPwd: action.pwd}
        case ('pwd1'):
            return {...state, pwd1: action.pwd1}
        case ('pwd2'):
            return {...state, pwd2: action.pwd2}
        case ('validate'):
            return {...state, validpwd1: action.valid}
        case ('submit'):
            return {...state, submit: true, validpwd2: true};
        case ('no-submit'):
            return {...state, submit: false};
        case ('logout'):
            return {...state, logout: true, logoutToken: action.token};
        default:
            throw new Error();
    }
}

function validate(pwd) {
    const pwdPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/;

    return pwdPattern.test(pwd);
}


export function ChangePwd(props) {

    const { changePwdClick, cookies } = props;
    const { id, refresh_token, access_token } = cookies;

    const [ state, dispatch ] = useReducer(reducer, init);
    const Auth = useContext(userContext);

    const onChangeCurrentPwd = (event) => {
        const {value} = event.target;
        if (!value)
            dispatch({type: 'no-submit'});
        dispatch({type: 'current', pwd: value})
    }

    const onChangePwd1 = (event) => {
        const { value } = event.target;
        dispatch({type: 'pwd1', pwd1: value});
        dispatch({type: 'validate', valid: validate(value)})
    }

    const onChangePwd2 = event => {
        const { value } = event.target;
        dispatch({type: 'pwd2', pwd2: event.target.value})
        if(state.pwd1 === value && state.validpwd1) {
            dispatch({type: 'submit'});
        }else {
            dispatch({type: 'no-submit'});
        }
    }   

    const onSubmitClick = async (event) => {
        event.preventDefault();
        if (state.submit) {
            const authToken = await tokenRefresh(state.currentPwd, refresh_token);
            const res = await changePwd(authToken, id, state.pwd1);
            res.status === 200 ? dispatch({type:'logout', token: authToken}) : console.log("error");
        }
        else
            console.log("error",state.submit);
    }

    const logoutUser = async () => {
        Auth.setAuth(false);
        Cookies.remove("user");
        Cookies.remove("tokens");
    }


    return (
        <>
            <div className="form">
                <form>
                    <h4 className="title">Change Password</h4>
                    <p className="pwd-desc"> 
                    Remember: Your new password must be at least 8 charactors, must include at least 1 uppercase and 1 number.
                    </p>
                    <div className="textField">
                        <TextField
                        id="standard-password-input"
                        label="Current Password"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                        size="small"
                        defaultValue={state.currentPwd}
                        InputProps={{
                            endAdornment: 
                            <InputAdornment position="end">
                                {state.currentPwd ?  
                                <CheckIcon style={{ color: "green" }}/> : <CloseIcon color="secondary"/>
                                }
                            </InputAdornment>,
                        }}
                        onChange={onChangeCurrentPwd}/>
                    </div>
                    <div className="textField">
                        <TextField id="standard-password-input" label="New Password"
                        type="password" autoComplete="current-password" variant="outlined" size="small"
                        defaultValue={state.pwd1} 
                        InputProps={{
                            endAdornment: 
                            <InputAdornment position="end">
                                {state.pwd1 ?  
                                (state.validpwd1 ? 
                                (<CheckIcon style={{ color: "green" }}/>) : (<CloseIcon color="secondary"/>))
                                : ''
                                }
                            </InputAdornment>,
                        }}
                        onChange={onChangePwd1}
                        />
                    </div>
                    <div className="textField">
                        <TextField id="standard-password-input" label="New Password"
                        type="password" autoComplete="current-password" variant="outlined" size="small"
                        defaultValue={state.pwd2}
                        InputProps={{
                            endAdornment: 
                            <InputAdornment position="end">
                                {state.pwd2 ?  
                                (state.validpwd2 ? 
                                (<CheckIcon style={{ color: "green" }}/>) : (<CloseIcon color="secondary"/>))
                                : ''
                                }
                            </InputAdornment>,
                        }}
                        onChange={onChangePwd2}/>
                    </div>
                    <Button onClick={changePwdClick} variant="contained" color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" color="secondary" 
                        disabled={!state.submit} onClick={onSubmitClick}>
                        Submit
                    </Button>
                </form>
            </div>
            { state.logout && (<div className="bg-modal-logout">
                <div>
                    <p><b>You have successfully changed your password!</b></p>
                    <p>Click <b>Ok</b> to logout and log in back. :D</p>
                    <Button onClick={logoutUser}>OKAY</Button>
                </div>
            </div>)}
        </>
    );
}