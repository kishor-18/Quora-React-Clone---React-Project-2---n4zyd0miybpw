import React, { useState } from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';

const Sidebar = ({ user, setUser }) => {
  const[modalIsOpen, setModalIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('question');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSidebarClick = (action) => {
    if (!user.isLoggedIn) {
      alert('Please log in to ' + action);
    } else {
        setModalIsOpen(!modalIsOpen);
        
      console.log(`User is performing action: ${action}`);
    }
  };

  const header = {}

  return (<>
    <div className="sidebar">
      <h3 onClick={() => handleSidebarClick('create space')}>+ Create Space</h3>
      <ul>
        <li><a href="#" onClick={() => handleSidebarClick('access Food Therapy')}>Food Therapy </a></li>
        <li><a href="#" onClick={() => handleSidebarClick('access Entrepreneurship Ideas')}>Entrepreneurship Ideas </a></li>
        <li><a href="#" onClick={() => handleSidebarClick('access Business Ideas')}>Business Ideas </a></li>
        <li><a href="#" onClick={() => handleSidebarClick('access Trending on social media')}>Trending on social media </a></li>
      </ul>
    </div>
    <div>
      <ReactModal 
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      >
        <div className='modal'>
       <div className="modal-header">
        <button
          className={`tab-button ${activeTab === 'question' ? 'active' : ''}`}
          onClick={() => setActiveTab('question')}
        >
          Add Question
        </button>
        <button
          className={`tab-button ${activeTab === 'post' ? 'active' : ''}`}
          onClick={() => setActiveTab('post')}
        >
          Create Post
        </button>
      </div>
      <div className="modal-body">
        {activeTab === 'question' ? (
          <>
            <p>Tips on getting good answers quickly</p>
            <ul>
              <li>Make sure your question has not been asked already</li>
              <li>Keep your question short and to the point</li>
              <li>Double-check grammar and spelling</li>
            </ul>
          </>
        ) : null}
        <input
          type="text"
          placeholder={activeTab === 'question' ? "Start your question with 'What', 'How', 'Why', etc." : "Title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {activeTab === 'post' ? (
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : null}
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <div className="modal-actions">
          <button className='addpost-button' onClick>Submit</button>
          <button className='addpost-button' onClick>Cancel</button>
        </div>
      </div>
      </div>
      </ReactModal>
    </div>
    </>
  );
};

export default Sidebar;
