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