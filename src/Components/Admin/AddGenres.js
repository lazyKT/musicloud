import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import { genres } from './Styles/addForm';
import TextField from '@material-ui/core/TextField';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';

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

export function AddGenres ( props ) {

    const { postData } = props;

    const [ genre, setGenre ] = useState({name: '', cover_url: ''});

    function onChange (event) {
        setGenre({
            ...genre,
            [event.target.name] : event.target.value
        })
    }

    return(
        <div >
            <form style={genres.form}>
                <TextField value={genre.name} name="name" onChange={onChange}/>
                <Button style={genres.addButton} variant="contained"
                startIcon={<AddCircleOutlinedIcon />}
                onClick={() => postData(genre)}>
                    Add
                </Button>
            </form>   
        </div>
    );
}