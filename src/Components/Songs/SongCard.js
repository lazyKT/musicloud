import React, { useState, useEffect } from 'react';


/* Styling Card Element*/
const styles = {
    card: {
        width: "50%",
        height: "fit-content",
        background: "center",
        padding: "5px 20px",
        margin: "10px auto",
        boxShadow: "0px 3px 5px 0px gainsboro"
    },
    title: {
        fontSize: "18px",
        fontFamily: "sans-serif",
        fontWeight: "600",
        color: "coral",
        width: "100%",
        display: "table-cell",
        margin: "5px 0px"
    },
    user: {
        fontSize: "13px",
        fontFamily: "monospace"
    },
    current: {
        background: "gainsboro",
        width: "50%",
        height: "fit-content",
        padding: "5px 20px",
        margin: "10px auto",
        boxShadow: "0px 3px 5px 0px gainsboro"
    }
}

export function SongCard(props) {

    const { id, title, user, click, playing } = props;

    const [ hover, setHover ] = useState(false);

    // : Hover Effects on Cards
    function onHoverCard(event) {
        setHover(!hover);
        hover ? event.target.style.boxShadow = '0px 6px 10px 0px gainsboro' :
            event.target.style.boxShadow = '0px 3px 5px 0px gainsboro';
    }

    /** -- side effects on Click -- */
    useEffect( () => {

    }, [click]);

    /** -- Render -- */
    /** -- Song Card -- */
    return(
        <>
            {/* change card color of current playing song */}
            <div style={ playing === id ? styles.current : styles.card} 
            onMouseOver={onHoverCard} key={id} onMouseLeave={onHoverCard} 
            onClick={(event) => click(event, id)}>
                <p style={styles.title}>{title}</p>
                <span style={styles.user}>Posted by : {user}</span>
            </div>
        </>
    )
}