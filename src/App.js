import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Components/Home';
import { About } from './Components/About';
import { Dashboard } from './Components/Dashboard';
import { userContext } from './Contexts/userContext';
import ProtectedRoute from './Routes/ProtectedRoute';
import ProtectedLogin from './Routes/ProtectedLogin';
import { Nav } from './Components/Navigation/Nav';
import Register from './Components/Register';
import Profile from './Components/Profile';
import AdminHome from './Components/Admin/AdminHome';

function App() {

  const [ auth, setAuth ] = useState(false);

  const readCookies = () => {
    const user = Cookies.get("user");
    const tokens = Cookies.get("tokens");
    if(user && tokens)
    {
      setAuth(true);
    }
  }

  useEffect(() => {
    readCookies();
  },[auth])

  return(
    <userContext.Provider value={{auth,setAuth}}>
      <Router>
        <Nav/>
        <ProtectedLogin value="/" path="/" exact component={ Home }/>
        <Route value="/register" path="/register" component={ Register } />
        <Route path="/about" component={ About } />
        <ProtectedRoute path="/profile" component={ Profile }/>
        <ProtectedRoute path="/dashboard" component={ Dashboard } />
      </Router>
    </userContext.Provider>
  );
}

export default App;