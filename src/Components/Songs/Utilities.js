/**
 * These are the helper functions for the songs 
 * These functions help the music player and songs to run as they are intended.
 */
export function shuffleSongs(songs) {
   
    //console.log("fn", songs);

    /** 
     * -- the ideal implementation is copy the original contents
     * -- to the new array.
     * -- This can prevent the mutation to original array.
     */
    for (let i = songs.length - 1; i > 0; i--) {
        const j = Math.floor( Math.random() * i);
        const temp = songs[i];
        songs[i] = songs[j];
        songs[j] = temp;
    }
}


/**
 * convert seconds to hh:mm:ss format 
 */
export function formatTimeStamps(seconds) {

    let s = Number(seconds);
    let min = 0;
    let hr = 0;

    // if less than an hour
    if (s < 3600) {
        min = Math.floor(s/60);
        s = Math.floor(s%60);

        let timestamps = padZero((min).toString()) + ":" + padZero((s).toString());
        return timestamps;
    } 
    return "00:00"
}


/**
 * pad zeros to the start of timestamps
 */
function padZero(time) {
    if (time.length < 2)
        return `0${time}`;
    return time;
}


/** Fake Network Req For Testing */
export function FakeReq() {

    return new Promise( (resolve, reject) => {
        const num = Math.floor(Math.random() * 100);

        if (num % 9 <= 3) {
            resolve("200");
        } else {
            reject("Error Encountered");
        }
    });
}