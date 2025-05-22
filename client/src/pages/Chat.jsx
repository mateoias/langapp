import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';

function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello, what would you like to talk about today?', sender: 'bot' }
  ]);
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text) => {
    if (!text.trim()) return;
  
    const userMessage = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
  
    try {
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({message: text})
      });
  
      const data = await res.json();
  
      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'bot'
      };
  
      setMessages(prev => [...prev, botMessage]);
  
    } catch (err) {
      console.error('Error communicating with server:', err);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Sorry, I couldn't get a response.",
        sender: 'bot'
      }]);
    }
  };

  return (
    <div className="chat-container">
  {messages.map((msg) => (
    <div key={msg.id} className={`message-row ${msg.sender}`}>
      <div className={`message-bubble ${msg.sender}`}>
        <strong>{msg.sender === 'bot' ? 'Bot' : 'You'}:</strong><br />
        {msg.text}
      </div>
    </div>
  ))}
  <div ref={messagesEndRef} />
  <ChatInput onSend={handleSend} />
</div>

  );
}

function ChatInput({ onSend }) {
  const [input, setInput] = useState('');

  const submit = (e) => {
    e.preventDefault();
    onSend(input);
    setInput('');
  };

  return (
    <form onSubmit={submit} style={{ marginTop: '1rem', display: 'flex' }}>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type your message..."
        style={{ flexGrow: 1, padding: '0.5rem' }}
      />
      <button type="submit" style={{ marginLeft: '0.5rem' }}>Send</button>
    </form>
  );
}

export default Chat;
