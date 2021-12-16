import React from 'react';
import './Login.css';

import { useContext, useRef } from 'react';
import { CircularProgress } from '@material-ui/core';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, authActions } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall({ email: email.current.value, password: password.current.value }, authActions);
  };

  return(
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social Media</h3>
          <span className="loginDesc">Connect with friends and the world around you on Social Media.</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Email" required type="email" className="loginInput" ref={email} />
            <input placeholder="Password" required minLength="6" type="password" className="loginInput" ref={password} />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (<CircularProgress style={{
                "color": "white", 
                "width": "20px", 
                "height": "20px"
              }} />) :  ("Log In")}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              {isFetching ? (<CircularProgress style={{
                "color": "white", 
                "width": "20px", 
                "height": "20px"
              }} />) : ("Create a New Account")}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
