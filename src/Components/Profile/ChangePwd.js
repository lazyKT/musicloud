import React, { useReducer } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import '../../App.css';

function init(){
    return ({
        pwd1: null,
        pwd2: '',
        validpwd1: false,
        submit: false
    })
}

function reducer(state, action) {
    switch(action.type) {
        case ('pwd1'):
            return {...state, pwd1: action.pwd1}
        case ('pwd2'):
            return {...state, pwd2: action.pwd2}
        case ('validate'):
            return {...state, validpwd1: action.valid}
        case ('submit'):
            return {...state, submit: true};
        case ('no-submit'):
            return {...state, submit: false};
        default:
            throw new Error();
    }
}

function validate(pwd) {
    const pwdPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/;

    return pwdPattern.test(pwd);
}


export function ChangePwd(props) {

    const { changePwdClick } = props;

    const [ state, dispatch ] = useReducer(reducer, init);

    const onChangePwd1 = (event) => {
        // set textfield color to red until it passes the validation
        // set textfield to green after it passed the validation
        const { value } = event.target;
        dispatch({type: 'pwd1', pwd1: value});
        console.log(validate(value));
        dispatch({type: 'validate', valid: validate(value)})
    }

    const onChangePwd2 = event => {
        // compare this with pwd1
        // if pwd1 and pwd2 are the same, show the change button
        const { value } = event.target;
        dispatch({type: 'pwd2', pwd2: event.target.value})
        if(state.pwd1 === value && state.validpwd1) {
            dispatch({type: 'submit'});
        }else {
            dispatch({type: 'no-submit'});
        }
    }   

    const onSubmitClick = event => {
        event.preventDefault();
        if (state.submit)
            console.log("Change Password!!!");
        else
            console.log("error",state.submit);
    }


    return (
        <>
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
                    size="small"/>
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
                            (state.submit ? 
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
        </>
    );
}