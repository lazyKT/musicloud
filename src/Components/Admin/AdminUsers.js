import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useFetchUsers } from './CustomHooks/useFetchUsers';
import Cookies from 'js-cookie';
import AdminTable from './AdminTable';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import { PaginationOpr } from './Utils/PaginationOpr';
import { AddUser } from './AddUser';
import { DeleteOpr, CreateOpr, UpdateOpr } from './CrudFunctions/Users';
import { styles } from './Styles/Users';
import { SearchRows } from './Utils/SearchRows';
import { ExpiredToken } from '.././Errors/ExpiredToken';

const header = [
    {
        name: "User ID",
        prop: 'id',
    },
    {
        name: "User Name",
        prop: 'username',
    },
    {
        name: "Email Address",
        prop: 'email',
    },
    {
        name: "User Role",
        prop: 'role',
    },
]

const AdminUsers = () => {
    
    const [ token, setToken ] = useState(null);
    const [ searchResult, setSearchResult ] = useState('');
    const [ headerMsg, setHeaderMsg ] = useState(null);
    const [ headerType, setHeaderType ] = useState(null);
    const [ showHeaderMsg, setShowHeaderMsg ] = useState(true);
    const [ users, setUsers ] = useState([]);
    const [ showUsers, setShowUsers ] = useState([]);
    const [ editID, setEditID ] = useState(-1);
    const [ adding, setAdding ] = useState(false);
    const [ sortingOrder, setSortingOrder ] = useState(true);
    const [ sortingColumn, setSortingColumn ] = useState(null);
    const [ rowsPerPage, setRowsPerPage ] = useState(5);
    const [ currentPage, setCurrentPage ] = useState(1);

    const { data, loaded } = useFetchUsers(token);

    // Pagination Functions
    let lastindexofRow = currentPage * rowsPerPage;
    let firstindexofRow = lastindexofRow - rowsPerPage;
    let currentRows = showUsers.slice(firstindexofRow, lastindexofRow);

    const getCookies = () => {
        const user = Cookies.get("user");
        const tokens = Cookies.get("tokens");
        if(user && tokens){
            setToken(JSON.parse(tokens).access_token);
        }
    }

    useEffect(() => {
        getCookies();
    })

    useEffect(() => {
        if(data && loaded){
            setUsers(data.users);
            setShowUsers(data.users);
        }
    },[loaded,data])

    const addUser = (newUser) => {
        setAdding(!adding);
    }

    const createUser = (newUser) => {
        setAdding(!adding);
        CreateOpr(newUser).then(response => {
            if(response.status === 201){
                setShowUsers(showUsers.concat(response.data));
                setHeaderMsg("New User Created!!");
                setHeaderType('success');
                currentRows = showUsers.slice(firstindexofRow, lastindexofRow);
            }else{
                setHeaderMsg(response.data.msg);
                setHeaderType('fail');
            }
        })
    }

    // handle onChange event for editing the username
    const handleChange = (event, ColumnName, index) => {
        const { value } = event.target;
        setShowUsers(users.map(
            (row, i) => i === (index) ? {...row, [ColumnName] : value } : row
        ))
    }

    // handle edit button click
    const handleEdit = index => {
        setEditID(index);
    }

    // handle save opr of the updated data
    const handleSave = index => {
        setEditID(-1);
        const updatingUser = showUsers[index];
        //performUpdate(token, updatingUser);
        UpdateOpr(token, updatingUser).then(response => {
            if (response.status === 200 ) {
                setHeaderMsg(response.data.msg + " ID : "+updatingUser.id+", Username : " + updatingUser.username);
                setHeaderType('success');
            } else {
                setHeaderMsg(response.data.msg);
                setHeaderType('fail');
            }
        });
    }

    // handle delete opr
    const handleDelete = index => {
        //console.log("Deleting index "+index);
        const userToDelete = showUsers[index];
        if (window.confirm(
            'Are you sure you wish to delete this user? ID : ' + userToDelete.id + ", Username : " + userToDelete.username
            )){
            // Resolving Promise from DeleteOpr********
            DeleteOpr(token, index, showUsers)
            .then(resp => {
                if(resp.status === 200){
                    setShowUsers(showUsers.filter((row,i) => i != index));
                    setHeaderMsg(resp.data.msg+" ID: " + userToDelete.id + ", Username : " + userToDelete.username);
                    setHeaderType('success');
                    currentRows = showUsers.slice(firstindexofRow, lastindexofRow);
                }else{
                    setHeaderMsg(resp.data.msg);
                    setHeaderType('fail');
                }
            });
        }
    }

    const handleCancel = () => {
        setEditID(-1);
        setShowUsers(users);
    }

    const handleShowHeaderMsg = () => {
        setShowHeaderMsg(false);
    }

    const sorting = (key, order = 'asc') => {
        return function innerSort(a,b) {
            const objA = typeof a[key] === 'string' ? a[key].toLowerCase() : a[key];
            const objB = typeof b[key] === 'string' ? b[key].toLowerCase() : b[key];

            let comparison = 0;

            if (objA > objB)
                comparison = 1;
            else if ( objA < objB )
                comparison = -1;
            else 
                comparison = 0;

            return order == 'asc' ? comparison : comparison*-1;
        }
    }

    const sortingData = ColumnName => {
        let order = sortingOrder ? 'asc' : 'desc';
        setSortingColumn(ColumnName);
        setShowUsers(showUsers.sort(sorting(ColumnName, order)));
        setSortingOrder(!sortingOrder);
    }


    const searchUser = (keyword) => {
        let arr = data.users;
        return arr.filter((row,i) => 
        (arr[i].username).includes(keyword) || 
        (arr[i].email).includes(keyword)
        );
    }


    const handleSearch = event => {
        setSearchResult(event.target.value);
        let keyword = event.target.value;
        setShowUsers(searchUser(keyword));
    }

    const handlePaginate = (event, value) => {
        setCurrentPage(value);
    }

    const handleRowsPerPage = (event) => {
        console.log(event.target.value);
        setRowsPerPage(event.target.value);
        currentRows = showUsers.slice(firstindexofRow, lastindexofRow);
    }

    return(
        <>
            <div style={styles.headerDiv}>
                { loaded && <div>
                    { headerMsg && showHeaderMsg ?
                    <Paper style={styles.headerMsg}>
                        <span style={headerType === 'success' ? styles.headerTypeSuccess : styles.headerTypeError}>
                            {headerMsg}
                        </span>
                        <CloseIcon fontSize="small" onClick={handleShowHeaderMsg}/>
                    </Paper> : null}
                    <h3 style={styles.header}>Users Table</h3>
                    <SearchRows handleRowsPerPage={handleRowsPerPage}
                    rowsPerPage={rowsPerPage} handleSearch={ handleSearch } 
                    searchResult={ searchResult }
                    adding ={adding} addUser={addUser} 
                    />
                </div>}
                <div style={ adding ? styles.container : {display: "none"}}>
                    <AddUser addUser={createUser}/>
                </div>
                {/* Display Table */}
                { !loaded ? (<ExpiredToken/>) : 
                    <AdminTable data={ currentRows } header={header}
                    handleEdit={handleEdit} handleDelete={handleDelete} cancelOperation={handleCancel}
                    handleChange={handleChange} handleSave={handleSave} editID={editID} 
                    handleSort={sortingData} sortOrder={sortingOrder} sortingColumn= {sortingColumn}/> }
                { loaded ? <PaginationOpr 
                rowsPerPage={rowsPerPage}
                totalRows = {showUsers.length}
                handlePaginate = { handlePaginate }
                currentPage = { currentPage }
                /> : null}
            </div>
        </>
    );
}

export default withRouter(AdminUsers);