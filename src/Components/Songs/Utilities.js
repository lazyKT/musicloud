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
 * function for the play btn click without specifying any song
 * If the user click the play btn, but currently no song has been playing,
 * Play the first song in the song list
 */
export function firstSongURL(songs, url) {
    if (songs.length !== 0) 
        return `${url}${songs[0].id}`;
    // return null if songs is empty
    return null;
}
