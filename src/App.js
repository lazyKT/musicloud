import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Components/Home';
import Interchange from './Components/Interchange';
import { Dashboard } from './Components/Dashboard';
import { userContext } from './Contexts/userContext';
import ProtectedRoute from './Routes/ProtectedRoute';
import ProtectedLogin from './Routes/ProtectedLogin';
import { Nav } from './Components/Navigation/Nav';
import Register from './Components/Register';
import Profile from './Components/Profile';
import ForgetPassword from './Components/ForgetPassword'
import Support from './Components/Support';
import Contact from './Components/Contact/Contact';

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

  useEffect(() => {
    document.title = "MusiCloud";
  }, [])

  return(
    <userContext.Provider value={{auth,setAuth}}>
      <Router>
        
        {/* Navigation */}
        <Nav/>

        {/* If user is login, redirect to home page */}
        <ProtectedLogin value="/" path="/" exact component={ Home }/>

        {/* Public Routes */}
        <Route value="/register" path="/register" component={ Register } />
        <Route value="/home" path="/home" component={ Interchange } />
        <Route path="/forget-password" component={ ForgetPassword }/>
        <Route value="/support" exact path="/support" component={ Support }/>
        <Route value="/contact" exact path="/contact" component={ Contact } />

        {/* Private (or) Protected Routes */}
        <ProtectedRoute path="/profile" component={ Profile }/>
        <ProtectedRoute path="/dashboard" component={ Dashboard }/>

      </Router>
    </userContext.Provider>
  );
}

export default App;
