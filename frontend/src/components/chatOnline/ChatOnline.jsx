import React from "react";
import './ChatOnline.css';

export default function ChatOnline() {
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
