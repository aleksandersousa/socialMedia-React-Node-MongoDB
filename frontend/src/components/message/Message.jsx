import React from "react";
import './Message.css';

import { format } from 'timeago.js';

export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img src="https://source.unsplash.com/user/c_v_r/1900x800" alt="" className="messageImg" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};
