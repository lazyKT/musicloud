import React, { useState, useEffect, useReducer } from 'react';
import { useCookies } from '../Hooks/useCookies';
import { useFetchGenres } from './CustomHooks/useFetchGenres';
import { AdminTable } from './Utils/AdminTable';
import { HeadersDiv } from './Utils/HeadersDiv';
import { PaginationOpr } from './Utils/PaginationOpr';
import { styles } from './Styles/Users';
import { DeleteOpr } from './CrudFunctions/Data';
import { Sorting } from './Utils/Sorting';

const headers = [
    {
        name: "Genre Name",
        prop: 'name'
    }
]

function reducer(state, action) {
    switch (action.type) {
        case 'set': 
            return {msg: action.msg, type: action.code, display: true}
        default:
            throw new Error();
    }
}

const AdminGenres = () => {

    const url = 'http://127.0.0.1:8000/genres';
    const { cookies, login } = useCookies();
    const [ token, setToken ] = useState(null);

    // Initialise with empty array so that there is no map to null error
    // Idk if it's good or not, later I will learn more about it
    const [ genres, setGenres ] = useState([]); 
    const [ adding, setAdding ] = useState(false);
    const [ editID, setEditID ] = useState(-1);
    const [ paginate, setPaginate ] = useState({ currentPage: 1, rowsPage: 5})
    const [ searchKeyword, setSearchKeyWord ] = useState(null);

    const { data, loaded } = useFetchGenres(token, url);

    const [ header, dispatch ] = useReducer(reducer, {msg: null, type: null, display: false});

    let lastIndexofPage = paginate.currentPage * paginate.rowsPage;
    let firstIndexofPage = lastIndexofPage - paginate.rowsPage;
    let currentRows = genres.slice(firstIndexofPage, lastIndexofPage);

    const addGenre = _ => {
        setAdding(!adding);
    }

    const setHeader = m => {
        console.log("header", m);
        dispatch({
                type: 'set', 
                msg: m.status === 201 ? (m.data.msg + " is Added") : "Error",
                code: m.status === 201 ? "success" : "error"
            });
        if( m.status === 201)
            setGenres(genres.concat({name: m.data.msg}));
        setAdding(!adding);
    }

    const handleEdit = idx => {
        console.log("Editing ",idx);
        setEditID(idx);
    }

    const handleCancel = idx => {
        setEditID(-1);
    }

    const handleSave = idx => {
        console.log("Save!!!!", idx);
        // API doesn't have edit func for genres >.< Ops____
        setEditID(-1);
    }

    const handleDelete = async idx => { 
        const deleteIdx = firstIndexofPage + idx;
       
        if (window.confirm(
            'Are you sure you wish to delete this genre?')){
            // Resolving Promise from DeleteOpr********
            let res = await DeleteOpr(token, currentRows[idx].id);
            if (res.status === 200)
                setGenres(genres.filter((data, i) => 
                    i != deleteIdx
                ))
            dispatch({
                type: 'set',
                msg: res.status === 200 ? res.data.msg : "Error",
                code: res.status === 200 ? 'success' : 'error'
            })
        }
    }

    const handleChange = (event, Field, idx) => {
        setGenres(genres.map(
            (genre, i) => (i == idx) ? {...genre,[Field] : event.target.value} : genre
            ))
    }

    const handlePaginate = (event, value) => {
        setPaginate({currentPage: value, rowsPage:paginate.rowsPage})
    }

    const handleRowsPerPage = event => {
        setPaginate({currentPage:paginate.currentPage, rowsPage:event.target.value})
    }
    
    const searchGenre = keyword => {
        let source = data;
        return source.filter((genre, idx) => 
            ((source[idx].name).toLowerCase()).includes(keyword.toLowerCase())
        );
    }

    const handleSearch = event => {
        setSearchKeyWord(event.target.value);
        setGenres(searchGenre(event.target.value))
    }

    const handleSort = ColumnName => {
        let sorted = data.sort(Sorting(ColumnName));
        setGenres(sorted);
        console.log(genres);
        console.log("Indexs",firstIndexofPage, lastIndexofPage);
        currentRows = genres.slice(firstIndexofPage, lastIndexofPage);
    }

    useEffect(() => {
        if (cookies)
            setToken(cookies.access_token);
    },[cookies])

    useEffect(() => {
        console.log("Data Fetched Effects");
        console.log(data, loaded);
        if (data && loaded)
            setGenres(data);
    }, [loaded], [data]);

    useEffect(() => {
        console.log("Genre Changed");
    },[genres])


    return (
        <>
            <div style={styles.headerDiv}>
                <div>
                    <HeadersDiv title="Genres Table" headermsg={header.msg} headertype={header.type} 
                        display={header.display} adding={adding} handleRowsPerPage={handleRowsPerPage}
                        addData={addGenre} handleSearch={handleSearch} searchKeyword={searchKeyword}
                        setHeader={setHeader} token={token}/>
                </div>
                { login && loaded ? 
                    (<AdminTable data={currentRows} header={headers} editID={editID}
                        handleEdit={handleEdit} handleDelete={handleDelete} handleCancel={handleCancel}
                        handleChange={handleChange} handleSave={handleSave} handleSort={handleSort}
                    />)
                : "Loading...."}
                { login && loaded ? 
                    (<PaginationOpr handlePaginate={handlePaginate} currentPage={paginate.currentPage}
                        totalRows={genres.length} rowsPerPage={paginate.rowsPage}
                    />)
                    : null
                }
            </div>
        </>
    );

}

export default AdminGenres;