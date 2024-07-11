import React, { useState } from 'react';
import AddPost from './Addpost';
import './Question.css';
import { useNavigate } from 'react-router-dom';


const Question = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);


  const toggleAddPost = () => {
    if (!user.isLoggedIn) {
      alert('Please log in to add post');
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="question">
      <div className="question-title">
        <i className="fa-solid fa-user"></i>
        <input className='question-input' type="text" onClick={toggleAddPost} placeholder='What do you want to ask or share?' />
      </div>
      <div className="question-body">
        <div className="question-action" onClick={() => toggleAddPost('ask')}>
          <i className='fa-solid fa-question'></i><span>Ask</span>
        </div>
        <div className="question-action" onClick={() => navigate('/answers')}>
          <i className='fa-solid fa-pen-to-square'></i><span>Answer</span>
        </div>
        <div className="question-action" onClick={() => toggleAddPost('post')}>
          <i className='fa-solid fa-pen'></i><span>Post</span>
        </div>
      </div>
      <AddPost
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      />
    </div>
  );
}

export default Question;
