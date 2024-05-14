import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [previousChats, setPreviousChats] = useState([]);
  const [messageOutput , setMessOut] = useState("");
  const createNewChat = () => {
    setCurrentTitle(null);
    setValue(null);
    setMessage(null);
  }

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setValue("");
  }

  const getMessages = async () => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await fetch('http://localhost:8000/completions', options);
      const data = await response.json();
      setMessage(data.error ? data.error : data.message);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    console.log(currentTitle, value, message);
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
      setMessOut(value);
    }
    if (currentTitle && value && message) {
      setPreviousChats(prevChats => (
        [...prevChats,
          {
            title: currentTitle,
            role: 'user',
            content: value
        },
          {
            title: currentTitle,
            role: message.role,
            content: message.content
          }
        ]
      ))
    }
  }, [message, currentTitle]);
  console.log(previousChats);
  const currentChat = previousChats.filter(previousChats => previousChats.title === currentTitle);
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)));
  console.log(uniqueTitles);
  return (
    <div className="App">
      <section className='side-bar'>
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className="history">
          {uniqueTitles.map((uniqueTitle, index) =>
            <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
        </ul>
        <nav>
          
        </nav>
      </section>
      <section className='main'>
        {!currentTitle && <h1>GPT</h1>}
        <ul className='feed'>
          {currentChat?.map((chat, index) => (
            <li key={index} className={chat.role}>
              <h4 className='role'>{chat.role}</h4>
              <p>{chat.choices}</p>
            </li>
          ))}
        </ul>
        <div className='bottom-section'>
          <div className='input-container'>
            <p>{messageOutput}</p>
            <input type='text' value={value} onChange={(e) => setValue(e.target.value)} placeholder='Type a message...' />
            <div id='submit' onClick={getMessages}>♦{'=>'}</div>
          </div>
        </div>
        <p className="info">
          Gpt is a chatbot that uses the GPT-3 API to generate responses to messages. It is currently in development, so please don't expect it to work perfectly. It is also not currently hosted anywhere, so you'll have to run it locally. If you want to help out, feel free to contribute to the <a href="https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus">ChatGPT+ subscription</a>
        </p>
      </section>
    </div>
  );
}

export default App;