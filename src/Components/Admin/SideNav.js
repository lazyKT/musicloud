import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../../App.css';
import Menu from '../../Imgs/burger_white.png';

const SideNav = () => {

    const [ toggle, setToggle ] = useState(false);

    const toggleClick = event =>{
        event.preventDefault();
        setToggle(!toggle);
    }

    return(

        <div style={{background:'gray'}}>
                <button onClick={toggleClick} className={!toggle ? "btn-expand" : null}>
                    <img src={ Menu } alt="Credit to Flaticon" className="menu-icon"/>
                </button>
            <div className="side-nav-container">
                { toggle ? null : 
                    <div className="side-bar">
                        {/* <ul>
                            <Link><li>Home</li></Link>
                            <Link><li>Users</li></Link>
                            <Link><li>Songs</li></Link>
                            <Link><li>Artists</li></Link>
                        </ul> */}
                        <Link to='/dashboard'>Home</Link>
                        <Link to='/dashboard/admin/Users'>Users</Link>
                        <Link to='/dashboard/admin/Songs'>Songs</Link>
                    </div>    
                }
            </div>
        </div>
    );
}

export default withRouter(SideNav);