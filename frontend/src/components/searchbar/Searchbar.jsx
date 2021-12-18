import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Searchbar.css';

import { Search } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';

export default function Searchbar() {
  const [myOptions, setMyOptions] = useState([])
  const navigate = useNavigate();

  const getUsers = async () => {
    const res = await axios.get('/users/all');
    for (var i = 0; i < res.data.length; i++) {
      if (!myOptions.includes(res.data[i].username)) {
        myOptions.push(res.data[i].username);
      }
    }
    setMyOptions(myOptions);
  }

  const useStyles = makeStyles({
    underline: {
      "&&&:before": {
        borderBottom: "none"
      },
      "&&:after": {
        borderBottom: "none"
      }
    }
  });

  const classes = useStyles();

  return (
    <div className="searchbar">
      <Autocomplete 
        className="searchInput"
        freeSolo
        autoComplete
        options={myOptions}
        onChange={(e, value) => navigate('/profile/' + value)}
        renderInput={(params) => (
          <>
            <Search className="searchIcon"/>
            <TextField {...params}
              onChange={getUsers}
              placeholder="Search for friends, posts or videos"
              InputProps={{ ...params.InputProps, classes }}
            />
          </>
        )} />
        {/* {results.length > 0 ? (
          <div className="searchContainer">
            <img src={user.profilePicture} alt="" className="searchUserImg" />
            <span className="searchUserUsername">{user.username}
            </span>
          </div>
        ) : null} */}
    </div>
  );
}
