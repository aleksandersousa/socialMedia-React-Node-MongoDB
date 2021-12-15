import React, { useState } from 'react';
import './Feed.css';
import { useEffect } from 'react';
import axios from 'axios';

import Post from '../post/Post';
import Share from '../share/Share';

export default function Feed({ username }) {
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get('/posts/profile/' + username)
        : await axios.get('/posts/timeline/61b4a648ade8924c3dae6cb3');
      setPosts(res.data);
    }
    fetchPosts();
  },[username]);

  return(
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (<Post key={p._id} post={p}/>))}
      </div>
    </div>
  );
}
