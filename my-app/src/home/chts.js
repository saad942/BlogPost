// ChatbotComponent.js

import React, { useState } from 'react';

const ChatbotComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (!inputText.trim()) return;

    setMessages([...messages, { text: inputText, isUser: true }]);
    setInputText('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div key={index} style={{ ...styles.message, textAlign: msg.isUser ? 'right' : 'left' }}>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input 
          type="text" 
          value={inputText} 
          onChange={(e) => setInputText(e.target.value)} 
          placeholder="Type your message..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.sendButton}>Send</button>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: 20,
  },
  message: {
    marginBottom: 20,
    maxWidth: '70%',
    padding: '12px 16px',
    borderRadius: 12,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
    borderTop: '1px solid #eeeeee',
  },
  input: {
    flex: 1,
    height: 40,
    border: 'none',
    borderRadius: 20,
    padding: '0 20px',
    marginRight: 20,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  sendButton: {
    height: 40,
    border: 'none',
    borderRadius: 20,
    backgroundColor: '#007bff',
    color: '#ffffff',
    padding: '0 24px',
    cursor: 'pointer',
    fontSize: 16,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
  },
};

export default ChatbotComponent;
