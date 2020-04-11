import React, {useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = {
    container:{
        margin: "10px 0px"
    },
    header: {
        display: "inline-block"
    },
    addBtn: {
        float: "right",
        display: "flex",
        padding: "10px 20px",
        background: "crimson",
        color: "white"
    },
    input: {
        marginLeft: "10px"
    },
    switch: {
        margin: "10px 10px"
    },
    cancelBtn: {
        float: "right",
        display: "flex",
        padding: "10px 20px",
        background: "deepskyblue",
        color: "white"
    }
}

export const AddUser = props => {

    const { addUser } = props;

    const [ newUser, setNewUser ] = useState({username:'',email: '', password: ''});
    const [ admin, setAdmin ] = useState(false);

    const onChange = event => {
        setNewUser({
            ...newUser,
            [event.target.name] : event.target.value
        })
    }

    const onToggle = () => {
        setAdmin(!admin);
        console.log(admin);
    }

    const handleSubmit = event => {
        event.preventDefault();
        const role = admin ? 'admin' : '';
        const userToAdd = {username: newUser.username, email: newUser.email, password: newUser.password, role}
        console.log(userToAdd);
        addUser(userToAdd);
    }

    return(
        <form>
            <TextField style={styles.input} id="standard-basic" value={newUser.username}
                name="username" label="Username" onChange={onChange}/>
            <TextField style={styles.input} id="standard-basic" value={newUser.email}
                name="email" label="Email Address" onChange={onChange}/>
            <TextField style={styles.input} id="standard-basic" value={newUser.password}
                name="password" label="Password" type="password" onChange={onChange}/>
            <FormControlLabel style={styles.switch} labelPlacement="start" label="Admin" 
            control={<Switch value="admin" onChange={onToggle} checked={admin}/>} />
            <Button style={styles.addBtn} variant="contained"
                startIcon={<AddCircleOutlinedIcon />}
                onClick={handleSubmit}>
                    Add
            </Button>
        </form>
    );
}