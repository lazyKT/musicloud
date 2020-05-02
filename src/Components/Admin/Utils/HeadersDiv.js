import React, { useState, useReducer, useEffect } from 'react';
import { PostOpr } from '../CrudFunctions/Data';
import { styles } from "../Styles/Users";
import { AddGenres } from "../AddGenres";
import { SearchRows } from './SearchRows';
import { useCookies } from '../../Hooks/useCookies';

export function HeadersDiv ( props ) {

    const { title, headermsg, headertype, display, adding, setHeader, token,
        handleRowsPerPage, addData, handleSearch, searchKeyWord } = props;

    const postData = async (m) => {

        let res = await PostOpr(token, m);
        console.log("Post Data");
        setHeader(res);
    }

    return(
        <>
            { display ? (
                <div style={ 
                    headertype === 'error' ? styles.headerTypeError : styles.headerTypeSuccess}>
                    { headermsg }
                </div>
            ) : null }
            <div>
                <h3 style={styles.header}>{ title }</h3>
                <SearchRows handleRowsPerPage={handleRowsPerPage} searchResult={searchKeyWord}
                    adding={adding} addData={addData} handleSearch={handleSearch}
                />
                { adding ? 
                    (<AddGenres postData={postData}/>) : null
                }
            </div>
        </>
    );
}