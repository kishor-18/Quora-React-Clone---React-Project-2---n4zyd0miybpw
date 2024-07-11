import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import './Sidebar.css';

const Sidebar = ({ user, setUser, setSpaces }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSidebarClick = (action) => {
    if (!user.isLoggedIn) {
      alert('Please log in to ' + action);
    } else {
      setModalIsOpen(true);
    }
  };

  const handleCreateSpace = async () => {
    const header = {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODJmMDllOTVlMzg5ZmIxMjM1ZGMyZCIsImlhdCI6MTcxOTk5MTA1MCwiZXhwIjoxNzUxNTI3MDUwfQ.uJcBDToCRYd34LZ2ouRD_p539HNXbdyCnxakRhL6POw',
      'projectID': 'vmyitayk3fnu',
    };

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('images', image); 
    }

    try {
      const response = await fetch('https://academics.newtonschool.co/api/v1/quora/channel/', {
        method: 'POST',
        headers: header,
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        console.log("handleCreateSpace",data);
        setSpaces(prevSpaces => [...prevSpaces, data]); 
        navigate('/spaces');
        setModalIsOpen(false); 
      } else {
        const responseText = await response.text(); 
        console.error('Failed to create space:', responseText);
        alert(`Failed to create space: ${responseText}`);
      }
    } catch (error) {
      console.error('Error creating space:', error);
      alert(`Error creating space: ${error.message}`);
    }
  };

  useEffect(() => {
    if (!user.isLoggedIn) {
      setModalIsOpen(false);
    }
  }, [user]);

  return (
    <>
      <div className="sidebar">
        <h3 onClick={() => handleSidebarClick('create space')}>+ Create Space</h3>
        <ul>
          <li><a href="#" onClick={() => window.open('https://www.quora.com/Is-it-important-for-your-therapist-to-know-if-you-skip-meals')}>Food Therapy</a></li>
          <li><a href="#" onClick={() => window.open('https://www.quora.com/What-are-some-great-business-ideas-that-you-wouldnt-mind-giving-away-for-free')}>Entrepreneurship Ideas</a></li>
          <li><a href="#" onClick={() => window.open('https://www.quora.com/What-are-some-low-cost-business-ideas-suitable-for-a-newbie-entrepreneur')}>Business Ideas</a></li>
          <li><a href="#" onClick={() => window.open('https://www.quora.com/Which-content-is-trending-today-in-social-media')}>Trending on social media</a></li>
        </ul>
      </div>
      <ReactModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="modal" overlayClassName="overlay">
        <div className="modal">
          <div className="modal-header">
            <h2>Create a Space</h2>
          </div>
          <div className="modal-body">
            <input
              type="text"
              placeholder="Space Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Space Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="modal-actions">
            <button className="addpost-button" onClick={handleCreateSpace}>Create</button>
            <button className="addpost-button" onClick={() => setModalIsOpen(false)}>Cancel</button>
          </div>
        </div>
      </ReactModal>
    </>
  );
};

export default Sidebar;
