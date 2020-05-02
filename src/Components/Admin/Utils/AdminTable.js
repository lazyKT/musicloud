import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { TextField } from '@material-ui/core';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@material-ui/icons/ArrowDropUpOutlined';
import { styles } from '../Styles/TableStyles';


const row = (payload, key, header, 
    handleEdit, handleDelete, handleCancel, editID, handleChange, handleSave) => {

    let currentEdit = editID === key;

    return (
        <TableRow key={`tbr-${key}`}>
            {
                header.map((h, k) => 
                    <TableCell key={`tbc${k}`}>
                        { currentEdit ? 
                            (<TextField name={h.prop} value={payload[h.prop]} 
                            onChange={event => handleChange(event, h.prop, key)}/>)
                            : payload[h.prop] 
                        }
                    </TableCell>
                )
            }
            {/* Edit Button */}
            <TableCell>
                { currentEdit ? <CheckIcon onClick={() => handleSave(key)}/>
                    : <EditRoundedIcon onClick={() => handleEdit(key)}/>
                }
            </TableCell>
            {/* Delete Button */}
            <TableCell>
                { currentEdit ? <CloseIcon onClick={() => handleCancel(key)} />
                : <DeleteIcon onClick={() => handleDelete(key)}/> 
                }
            </TableCell>
        </TableRow>
    );
}

export function AdminTable (props) {

    const { data, header, editID, sortedColumn, sorting,
        handleEdit, handleDelete, handleCancel, handleChange, handleSave, handleSort } = props;

    return (
        <TableContainer>
            <Table>
                {/* Table Headings */}
                <TableHead> 
                    <TableRow>
                        {
                            header.map((payload, key) => 
                                <TableCell  style={styles.tableHeadRow} key={`thc-${key}`}
                                    onClick={() => handleSort(payload.prop)} >
                                    { payload.name }
                                    { sortedColumn === payload.prop ? 
                                        (sorting ? <ArrowDropDownOutlinedIcon/> 
                                            : <ArrowDropUpOutlinedIcon/>)
                                    : null}
                                </TableCell>
                            )
                        }
                        <TableCell style={styles.tableHeadRow}>
                            Edit
                        </TableCell>
                        <TableCell style={styles.tableHeadRow}>
                            Delete    
                        </TableCell>
                    </TableRow>
                </TableHead>
                {/* Table Rows */}
                <TableBody>
                    {
                        data.map((payload, key) => 
                            row(payload, key, header, handleEdit, handleDelete, handleCancel, editID,
                                handleChange, handleSave)
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}