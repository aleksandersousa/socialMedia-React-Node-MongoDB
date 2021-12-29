import axios from "axios";
import React, { useEffect, useState } from "react";
import './ChatOnline.css';

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [ friends, setFriends ] = useState([]);
  const [ onlinefriends, setOnlineFriends ] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get('/users/friends/' + currentId);
      setFriends(res.data);
    };
    getFriends();
  }, [currentId]);

  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img src="https://source.unsplash.com/user/c_v_r/1900x800" alt="" className="chatOnlineImg" />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">Aleksander</span>
      </div>
    </div>
  );
};
