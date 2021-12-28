import React, { useContext, useState } from "react";
import './Messenger.css';

import Topbar from '../../components/topbar/Topbar';
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";

export default function Messenger() {
  const [ conversations, setConversations ] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get('/conversations/' + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  return (
    <div className="messenger">
      <Topbar />
      <div className="messengerBody">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => {
              return <Conversation key={c._id} conversation={c} currentUser={user}/>
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message />
              <Message own={true}/>
              <Message />
              <Message own={true}/>
              <Message />
              <Message own={true}/>
            </div>
            <div className="chatBoxBottom">
              <textarea className="chatMessageInput" placeholder="write something..."></textarea>
               <button className="chatSubmitButton">Send</button>
            </div>
          </div>
        </div>
        <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline />
        </div>
        </div>
      </div>
    </div>
  );
};
