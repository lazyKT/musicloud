import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@material-ui/icons/ArrowDropUpOutlined';
import { TextField } from '@material-ui/core';
import { styles } from './Styles/Users';

const row = (payload, key, header, editID, 
        handleEdit, handleDelete, handleChange, handleSave, cancelOperation) => {
    
    const currentEdit = editID === key;
    
    return(
        <TableRow key={`tr-${key}`}>
            {
                // h for header, k for key
                header.map((h,k) => 
                <TableCell key={`trc-${k}`}>
                    { currentEdit ? 
                    <TextField name={h.prop} 
                    value={payload[h.prop]} onChange={(event) => handleChange(event, h.prop, key)}/> 
                    : payload[h.prop]}
                </TableCell>
                )
            }
            {/* Edit Button */}
            <TableCell>
                { currentEdit ? <CheckIcon onClick={() => handleSave(key)}/>
                : <EditRoundedIcon onClick={() => handleEdit(key)}/>}
            </TableCell>
            {/* Delete Button */}
            <TableCell>
                { currentEdit ? <CloseIcon onClick={() => cancelOperation(key)}/>
                : <DeleteIcon style={{color:'red'}}
                 onClick={()=> handleDelete(key)}/>}
            </TableCell>
        </TableRow>
    );
}

const AdminTable = ({ data, header, editID,handleEdit, handleDelete, 
    handleChange, handleSave, cancelOperation, handleSort, sortOrder, sortingColumn}) => {

    return(
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            header.map((payload, key) => 
                            <TableCell key={`thc-${key}`}>
                                <div onClick={() => handleSort(payload.prop)}>
                                    {payload.name}
                                    { sortingColumn == payload.prop ?
                                    (!sortOrder ? (<ArrowDropDownOutlinedIcon style={styles.sortingArrow}/>) 
                                    : (<ArrowDropUpOutlinedIcon style={styles.sortingArrow}/>)) : null}
                                </div>
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    { data.map((payload, key) => 
                        row(payload, key, header, editID, 
                            handleEdit, handleDelete, handleChange, handleSave, cancelOperation) 
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default withRouter(AdminTable);
    
