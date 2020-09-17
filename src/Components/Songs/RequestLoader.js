/** -- UI (render) part of Song Player -- */
import React, { useEffect }  from 'react';
import Loader from 'react-loader-spinner';

const styles = {
    loaderContainer: {
        width: "50%",
        height: "fit-content",
        background: "gray",
        padding: "5px 20px",
        margin: "10px auto",
        boxShadow: "0px 3px 5px 0px gainsboro"
    },
    label: {
        color: "coral",
        fontSize: "20px",
        fontStyle: "oblique",
        fontFamily: "inherit",
        width: "fit-content",
        margin: "auto",
        display: "block"
    },
    loader: {
        display: "flex",
        width: "fit-content",
        height: "20px",
        margin: "auto",
        padding: "5px"
    }
}

function RequestLoader (props) {

    const { name, addSong } = props;

    function startProcess(name) {
        let processTime = 0;

        let processInterval = setInterval(processing, 1000);

        function processing() {
            if (processTime >= 10) {
                clearInterval(processInterval);
                addSong(name);
            }
            processTime++;
        }
    }

    useEffect(() => {
        name && startProcess(name);
    }, [name]);

    return (
      <div style={styles.loaderContainer}>
          <div>
            <span style={styles.label}>Processing {name}</span>
            <div style={styles.loader}>
                <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={30}
                    width={30}
                    timeout={10000} //31 secs
                />
                &nbsp;
                <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={30}
                    width={30}
                    timeout={10000} //31 secs
                /> 
            </div>
          </div>
      </div>
    )
}


export default RequestLoader