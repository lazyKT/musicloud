import React from 'react';
import { styles } from '../Styles/Users';
import Pagination from '@material-ui/lab/Pagination';

export function PaginationOpr ( props ) {

    const { rowsPerPage, totalRows, currentPage, handlePaginate } = props;
    const pageCount = Math.ceil(totalRows/rowsPerPage);

    return(
        <Pagination 
        style={styles.pagination} 
        count={pageCount} 
        color="secondary" 
        page={currentPage}
        onChange={handlePaginate}/>
    );
}