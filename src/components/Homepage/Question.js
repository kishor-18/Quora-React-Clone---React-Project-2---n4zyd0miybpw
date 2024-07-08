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
        <div className="question-action" onClick={() => handleActionClick('ask')}>
          <i className='fa-solid fa-question'></i><span>Ask</span>
        </div>
        <div className="question-action" onClick={() => handleActionClick('answer')}>
          <i className='fa-solid fa-pen-to-square'></i><span>Answer</span>
        </div>
        <div className="question-action" onClick={() => handleActionClick('post')}>
          <i className='fa-solid fa-pen'></i><span>Post</span>
        </div>
      </div>
    </div>
  );
}

export default Question;
