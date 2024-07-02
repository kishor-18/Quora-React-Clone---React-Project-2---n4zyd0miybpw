import React from 'react';
import './Question.css';

const Question = ({ user, setUser }) => {
  const handleActionClick = (action) => {
    if (!user.isLoggedIn) {
      alert('Please log in to ' + action);
    } else {
      console.log(`User is performing action: ${action}`);
    }
  };

  return (
    <div className="question">
      <div className="question-title">
        <i className="fa-solid fa-user"></i>
        <input className='question-input' type="text" placeholder='What do you want to ask or share?' />
      </div>
      <div className="question-body">
        <i className='fa-solid fa-question' onClick={() => handleActionClick('ask')}></i><span>Ask</span>
        <i className='fa-solid fa-pen-to-square' onClick={() => handleActionClick('answer')}></i>Answer
        <i className='fa-solid fa-pen' onClick={() => handleActionClick('post')}></i>Post
      </div>
    </div>
  );
}

export default Question;
