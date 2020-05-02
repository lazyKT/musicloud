import React from 'react';
import SideNav from './Admin/SideNav'
import '../App.css'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import AdminHome from './Admin/AdminHome';
import AdminSongs from './Admin/AdminSongs';
import AdminUsers from './Admin/AdminUsers';
import AdminGenres from './Admin/AdminGenres';

const AdminDashBoard = () => {
    return(
        <Router>
            <div className="side-nav-container">
                <SideNav/>
                <div className="nav-elements">
                    <Route path="/dashboard" exact component={ AdminHome } />
                    <Route path="/dashboard/admin/songs" component={ AdminSongs } />
                    <Route path="/dashboard/admin/users" component={ AdminUsers } />
                    <Route path="/dashboard/admin/genres" component={ AdminGenres } />
                </div>
            </div>
        </Router>
    );
}

export default AdminDashBoard;