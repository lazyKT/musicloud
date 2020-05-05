import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import '../../App.css';


const useStyles = makeStyles( theme => ({
    textField: {
        margin: theme.spacing(1)
    },
    cancelBtn: {
        margin: "auto",
        height: "45px"
    }
}))


export function ChangePwd(props) {

    const classes = useStyles();

    const { cancelPwdClick } = props;

    return (
        <>
            <div className="cpf">
                <TextField className={classes.textField} label="New Password" variant="filled" 
                    size="small" />
                <TextField className={classes.textField} label="Re-type Password" variant="filled"
                    size="small" />
                <Button variant="outlined" className={classes.cancelBtn}
                    color="secondary" onClick={cancelPwdClick}>
                    Cancel
                </Button>
            </div>
        </>
    );
}