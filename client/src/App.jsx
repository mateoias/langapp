import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={
          <main className="landing-page">
            <h1>Welcome to Language Exchange AI</h1>
            <p>Your personal language learning companion.</p>
          </main>
        } />
        <Route path="/about" element={<About />} />
        {/* Add more routes here for FAQs, Beginner, Intermediate, Advanced */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<Chat />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;


