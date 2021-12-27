import React from "react";
import './Message.css';

export default function Message({ own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img src="https://source.unsplash.com/user/c_v_r/1900x800" alt="" className="messageImg" />
        <p className="messageText">Hello this is a message</p>
      </div>
      <div className="messageBottom">1 hour ago</div>
    </div>
  );
};
