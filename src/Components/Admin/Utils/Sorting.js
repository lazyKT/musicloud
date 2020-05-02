export const Sorting = (key, order = 'asc') => {
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