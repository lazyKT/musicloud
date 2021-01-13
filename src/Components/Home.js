/**
 * Home page
 */
import React from 'react';
import './Home.css';
import home from '../Imgs/home.jpg';
import AuthPopUp from './Auth/AuthPopUp';


function Home() {

  // open sign in pop up
  const [ showPopUp, setShowPopUp ] = React.useState(false);

  return(
    <>
      {showPopUp &&
        <AuthPopUp close={() => setShowPopUp(false)}/>
      }
      <div className="container">
        <div className="content">

          <h3>A Place Where You Can Keep All of Your Emoticons Together</h3>
          <img src={home} alt="home"/>
          <p>With MusiCloud, you can import any audio files or songs from almost everywhere in mp3 format 
            <span>(See available source).</span>&nbsp;
            All you need is the link of the source.
          </p>
          <p className="content-access">
            You can easily access MusiCloud from your Computer or Mobile.
          </p>
          <button onClick={() => setShowPopUp(true)}>
            Join MusiCloud.&nbsp;It's free.
          </button>
        </div>
      </div>
    </>
  )
}

export default Home;