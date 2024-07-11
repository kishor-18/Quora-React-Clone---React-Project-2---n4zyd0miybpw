// AddPost.js
import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import './Addpost.css';

const AddPost = ({ isOpen, onRequestClose, postId, currentTitle, currentContent, currentImage, fetchPosts }) => {
  const [activeTab, setActiveTab] = useState('question');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (postId) {
      setTitle(currentTitle || '');
      setContent(currentContent || '');
      setImage(currentImage || null);
    } else {
      setTitle('');
      setContent('');
      setImage(null);
    }
  }, [postId, currentTitle, currentContent, currentImage]);

  const handleSubmit = async () => {
    const url = postId ? `https://academics.newtonschool.co/api/v1/quora/post/${postId}` : 'https://academics.newtonschool.co/api/v1/quora/post/';
    const method = postId ? 'PATCH' : 'POST';

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODJmMDllOTVlMzg5ZmIxMjM1ZGMyZCIsImlhdCI6MTcxOTk5MTA1MCwiZXhwIjoxNzUxNTI3MDUwfQ.uJcBDToCRYd34LZ2ouRD_p539HNXbdyCnxakRhL6POw',
          'projectID': 'vmyitayk3fnu'
        },
        body: formData
      });

      if (response.ok) {
        console.log('Post ' + (postId ? 'updated' : 'created') + ' successfully');
        fetchPosts();  
        onRequestClose();
      } else {
        const data = await response.json();
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={postId ? "Edit Post" : "Create Post"}
      className="modal"
      overlayClassName="overlay"
    >
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
          <button className='addpost-button' onClick={handleSubmit}>Submit</button>
          <button className='addpost-button' onClick={onRequestClose}>Cancel</button>
        </div>
      </div>
    </ReactModal>
  );
};

export default AddPost;
