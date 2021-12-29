import React, { useContext } from 'react';
import './Topbar.css';

import { Person, Chat, Notifications } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { AuthContext } from  '../../context/AuthContext';
import Searchbar from '../searchbar/Searchbar';

export default function Topbar() {
  const { user, authActions } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  const handleClick = () => {
    authActions.logout();
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{textDecoration:"none"}}>
          <span className="logo">Social Media</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <Searchbar />
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink" onClick={handleClick}>Logout</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Link to="/messenger" style={{"color": "white"}}>
              <Chat />
              <span className="topbarIconBadge">2</span>
            </Link>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img src={user.profilePicture ? user.profilePicture : PF + 'person/noAvatar.png'} alt="" className="topbarImg" />
        </Link>
      </div>
    </div>
  );
}
