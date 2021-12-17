import React, { useContext, useRef, useState } from 'react';
import './Share.css';

import { PermMedia, Label, Room, EmojiEmotions } from '@material-ui/icons';
import axios from 'axios';

import { AuthContext } from '../../context/AuthContext';

export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const IMGBB_URL = process.env.REACT_APP_IMGBB_URL;
  const API_KEY = process.env.REACT_APP_IMGBB_API_KEY;
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [ file, setFile ] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();

    if (file) {
      let data = new FormData();
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = async () => {
        let base64 = fileReader.result;
        base64 = base64.replace(/^data:image\/[a-z]+;base64,/, '');
        data.append('image', base64);
        try {
          const res = await axios.post(IMGBB_URL, data, { params: { key: API_KEY } });
          const newPost = {
            userId: user._id,
            desc: desc.current.value,
            img: res.data.data.url
          };
          await axios.post('/posts', newPost);
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      }
    }

    
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img src={user.profilePicture ? PF + user.profilePicture : PF + 'person/noAvatar.png'} alt="" className="shareProfileImg" />
          <input placeholder={"What's in your mind, " + user.username + "?"} ref={desc} className="shareInput" />
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input style={{"display": "none"}} type="file" id="file" accept=".png, .jpeg, .jpg" onChange={(e) => setFile(e.target.files[0])} />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">Share</button>
        </form>
      </div>
    </div>
  );
}
