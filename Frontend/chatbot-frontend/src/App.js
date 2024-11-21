import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const sendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:5000/chat', {
        message: message,
      });
      setChatLog([...chatLog, { user: message, bot: response.data.response }]);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="App">
      <div className="chat-window">
        <div className="chat-log">
          {chatLog.map((chat, index) => (
            <div key={index}>
              <p><strong>You:</strong> {chat.user}</p>
              <p><strong>Bot:</strong> {chat.bot}</p>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
