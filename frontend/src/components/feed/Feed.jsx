import React, { useContext, useState, useEffect } from 'react';
import './Feed.css';
import axios from 'axios';

import Post from '../post/Post';
import Share from '../share/Share';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@material-ui/core';

export default function Feed({ username }) {
  const [ posts, setPosts ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get('/posts/profile/' + username)
        : await axios.get('/posts/timeline/' + user._id);
      setPosts(res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
      setIsLoading(false);
    }
    fetchPosts();
  },[username, user._id]);

  return(
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        { isLoading 
          ? <CircularProgress className="feedProgressBar" /> 
          : posts.map((p) => (<Post key={p._id} post={p}/>))
        }
      </div>
    </div>
  );
}
