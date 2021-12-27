import React, { useContext, useEffect, useState } from 'react';
import './Post.css';

import { MoreVert } from '@material-ui/icons';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../../context/AuthContext';

export default function Post({ post }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [ like, setLike ] = useState(post.likes.length);
  const [ isLiked, setIsLiked ] = useState(false);
  const [ user, setUser ] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  },[currentUser._id, post.likes]);

  const likeHandler = () => {
    try {
      axios.put('/posts/' + post._id, { userId: currentUser._id });
    } catch (err) {
      
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  }

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    }
    fetchUser();
  },[post.userId]);

  return(
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`} className="postLink">
              <img src={user.profilePicture ? user.profilePicture : PF+"person/noAvatar.png"} alt="" className="postProfileImg" />
              <span className="postUsername">{user.username}</span>
            </Link>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert className="postIcon" />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img src={PF+"like.png"} onClick={likeHandler} alt="" className="likeIcon" />
            <img src={PF+"heart.png"} onClick={likeHandler} alt="" className="likeIcon" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">5 comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
