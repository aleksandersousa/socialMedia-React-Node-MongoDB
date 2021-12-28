import React, { useContext, useState, useEffect, useRef } from "react";
import './Messenger.css';

import Topbar from '../../components/topbar/Topbar';
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Messenger() {
  const [ conversations, setConversations ] = useState([]);
  const [ messages, setMessages ] = useState([]);
  const [ currentChat, setCurrentChat ] = useState(null);
  const [ newMessage, setNewMessage ] = useState('');
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

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

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get('/messages/' + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };  
    getMessages();
  }, [currentChat?._id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id
    };

    try {
      const res = await axios.post('/messages', message);
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="messenger">
      <Topbar />
      <div className="messengerBody">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => {
              return (
                <div key={c._id} onClick={() => setCurrentChat(c)}>
                  <Conversation conversation={c} currentUser={user}/>
                </div>
              );
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => {
                    return (
                      <div key={m._id} ref={scrollRef}>
                        <Message message={m} own={m.sender === user._id}/>
                      </div>
                    );
                  })}
                </div>
                <div className="chatBoxBottom">
                  <textarea 
                    className="chatMessageInput" 
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                </div>
              </>
            ) : (
              <span className="noConversationText">Open a conversation to start a chat.</span>
            )}
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
