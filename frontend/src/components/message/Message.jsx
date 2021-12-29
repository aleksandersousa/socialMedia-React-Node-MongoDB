import React from "react";
import './Message.css';

import { format } from 'timeago.js';
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Message({userId, message, own }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`/users?userId=${userId}`);
      setUser(res.data);
    };
    getUser();
  }, [userId]);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img 
          src={user?.profilePicture ? user?.profilePicture : PF + 'person/noAvatar.png'} 
          alt="" 
          className="messageImg" 
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};
