import React, { useState } from 'react';


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
    }
}

export function SongCard(props) {

    const { id, title, user, click } = props;

    const [ hover, setHover ] = useState(false);

    // : Hover Effects on Cards
    function onHoverCard(event) {
        setHover(!hover);
        hover ? event.target.style.boxShadow = '0px 6px 10px 0px gainsboro' :
            event.target.style.boxShadow = '0px 3px 5px 0px gainsboro';
    }


    return(
        <>
            <div style={styles.card} onMouseOver={onHoverCard} key={id}
            onMouseLeave={onHoverCard} onClick={(event) => click(event, id)}>
                <p style={styles.title}>{title}</p>
                <span style={styles.user}>Posted by : {user}</span>
            </div>
        </>
    )
}