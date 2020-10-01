/** -- UI (render) part of Song Player -- */
import React, { useEffect }  from 'react';
import Loader from 'react-loader-spinner';
// import { FakeReq } from './Utilities';
import { checkTaskStatus } from '../UsersReqs/SongRequests';

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

    const { title, addSong, token, taskID } = props;

    function startProcess(title) {
        let processTime = 0;

        let processInterval = setInterval(processing, 5000);

        async function processing() {
            processTime++;
            try {
                const resp = await checkTaskStatus(taskID, token);
                console.log("fetch process", resp);
                const { status } = resp.data;
                // song is ready
                if (status === 201) {
                    addSong(true);
                    clearInterval(processInterval);
                }
                if (processTime > 5) {
                    addSong(false);
                    clearInterval(processInterval);
                }
            } catch (err) {
                console.log(err);
                if (processTime > 5) {
                    addSong(false);
                    clearInterval(processInterval);
                }
            }
        }
    }

    useEffect(() => {
        console.log('Request Loader', token, taskID);
        title && startProcess(title);
    }, [title]);

    return (
      <div style={styles.loaderContainer}>
          <div>
            <span style={styles.label}>Processing {title}</span>
            <div style={styles.loader}>
                <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={30}
                    width={30}
                    timeout={31000} //31 secs
                />
                &nbsp;
                <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={30}
                    width={30}
                    timeout={31000} //31 secs
                /> 
            </div>
          </div>
      </div>
    )
}


export default RequestLoader