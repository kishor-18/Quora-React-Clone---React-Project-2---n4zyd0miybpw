import React from 'react';
import './Question.css';

const Question = () => {
  return (
    <div className="question">
      <div className="question-title">
        <i className="fa-solid fa-user"></i>
        <input className='question-input' type="text" placeholder='What do you want to ask or share?' />
      </div>
      <div className="question-body">
        <i className='fa-solid fa-question'></i><span>Ask</span>
        <i className='fa-solid fa-pen-to-square'></i>Answer
        <i className='fa-solid fa-pen'></i>Post
      </div>
    </div>
  );
}

export default Question;
