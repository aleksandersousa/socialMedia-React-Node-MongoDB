import React from 'react';
import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';

export default function RoutesLogic() {
  const { user } = useContext(AuthContext)

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Login />}/>
        <Route path="login" element={user ? <Navigate to="/" /> : <Login />}/>
        <Route path="profile/:username" element={user ? <Profile /> : <Navigate to="/login" />}/>
        <Route path="register" element={user ? <Navigate to="/" /> : <Register />}/>
      </Routes>
    </Router>
  );
}
