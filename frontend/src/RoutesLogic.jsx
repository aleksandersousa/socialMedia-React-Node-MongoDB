import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';

export default function RoutesLogic() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="login" element={<Login />}/>
        <Route path="profile/:username" element={<Profile />}/>
        <Route path="register" element={<Register />}/>
      </Routes>
    </Router>
  );
}
