import React from 'react';
import Button from '@material-ui/core/Button';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import CancelIcon from '@material-ui/icons/Cancel';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { styles } from '../Styles/Users';

export function SearchRows ( props ) {
    const { adding, addData, handleSearch, searchResult, handleRowsPerPage, rowsPerPage } = props;

    return (
        <>
            <select onChange={handleRowsPerPage} value={rowsPerPage} style={styles.rowSelect}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
            </select>
            <h5 style={styles.header}>rows</h5>
            <TextField
                style={styles.searchInput} placeholder="Search"
                name="search" value={searchResult} onChange={handleSearch}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <SearchIcon />
                    </InputAdornment>
                ),
                }}
            />

            { !adding ?
            <Button style={styles.addBtn} variant="contained"
            startIcon={<AddCircleOutlinedIcon />}
            onClick={addData}>
                Add
            </Button> :
            <Button style={styles.cancelBtn} variant="contained"
                startIcon={<CancelIcon />}
                onClick={addData}>
                    Cancel
            </Button>}
        </>
    );
}