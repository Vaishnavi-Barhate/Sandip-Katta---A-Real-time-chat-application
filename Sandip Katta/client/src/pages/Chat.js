import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';
let socket;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [isUserSet, setIsUserSet] = useState(false);

  useEffect(() => {
    if (isUserSet) {
      socket = io(SOCKET_URL);
      socket.on('chatMessage', (msg) => setMessages((prev) => [...prev, msg]));
      return () => socket.disconnect();
    }
  }, [isUserSet]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('chatMessage', { userId, message });
      setMessage('');
    }
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #00F0FF, #8B00FF, #FF00A6, #00FF85)',
    backgroundSize: '400% 400%',
    animation: 'gradientBG 12s ease infinite',
    fontFamily: "'Comic Neue', cursive",
    padding: '20px',
    boxSizing: 'border-box'
  };

  const cardStyle = {
    background: 'rgba(0, 0, 0, 0.75)',
    borderRadius: '20px',
    boxShadow: '0 0 30px #FF00FF',
    width: '100%',
    maxWidth: '600px',
    padding: '30px',
    color: '#00FFD1',
    display: 'flex',
    flexDirection: 'column',
    backdropFilter: 'blur(5px)',
  };

  const inputStyle = {
    padding: '12px',
    borderRadius: '10px',
    fontSize: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#00FFD1',
    outline: 'none',
  };

  const buttonStyle = {
    padding: '12px 20px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#FF00FF',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 0 15px #FF00FF',
    transition: '0.3s ease all',
  };

  const buttonHoverStyle = {
    backgroundColor: '#00FFD1',
    color: '#000',
    boxShadow: '0 0 20px #00FFD1',
  };

  const [hoverBtn, setHoverBtn] = useState(false);

  return (
    <>
      <style>
        {`
          @keyframes gradientBG {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
        `}
      </style>
      {!isUserSet ? (
        <div style={containerStyle}>
          <div style={cardStyle}>
            <h2 style={{ textAlign: 'center', color: '#FF00FF', marginBottom: '20px' }}>
               Enter Your Name
            </h2>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Type your name"
              style={{ ...inputStyle, marginBottom: '20px' }}
            />
            <button
              style={hoverBtn ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
              onMouseEnter={() => setHoverBtn(true)}
              onMouseLeave={() => setHoverBtn(false)}
              onClick={() => {
                if (userId.trim()) {
                  localStorage.setItem('userId', userId.trim());
                  setIsUserSet(true);
                }
              }}
            >
               Let’s Chat
            </button>
          </div>
        </div>
      ) : (
        <div style={containerStyle}>
          <div style={cardStyle}>
            <h2 style={{ margin: 0, textAlign: 'center', color: '#FF00FF' }}>
               Sandip Katta Chat-Room
            </h2>
            <div
              style={{
                margin: '20px 0',
                borderRadius: '10px',
                height: '300px',
                overflowY: 'auto',
                padding: '15px',
                background: '#1e1e1e',
                color: '#00FFD1',
                flexGrow: 1,
              }}
            >
              {messages.map((msg, i) => {
                const isMe = msg.userId === userId;
                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: isMe ? 'flex-end' : 'flex-start',
                      marginBottom: '10px',
                    }}
                  >
                    <div
                      style={{
                        background: isMe ? '#42f5c2' : '#FF00FF',
                        color: '#000',
                        padding: '10px 15px',
                        borderRadius: '20px',
                        maxWidth: '60%',
                        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
                        fontWeight: 'bold',
                      }}
                    >
                      {msg.message}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', marginTop: '10px', gap: '10px' }}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                style={{ ...inputStyle, flex: 1 }}
              />
              <button
                style={hoverBtn ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
                onMouseEnter={() => setHoverBtn(true)}
                onMouseLeave={() => setHoverBtn(false)}
                onClick={sendMessage}
              >
                 Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
