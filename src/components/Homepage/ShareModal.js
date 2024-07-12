import React from 'react';
import './ShareModal.css';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

const ShareModal = ({ isOpen, onRequestClose, postLink }) => {
  if (!isOpen) return null;

  const shareText = `Check out this post: ${postLink}`;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onRequestClose}><MdClose size={24} /></button>
        <h2>Share this Post</h2>
        <div className="modal-body">
          <div className="share-option">
            <FaFacebook size={24} color="#3b5998" />
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${postLink}`} target="_blank" rel="noopener noreferrer">
              Share on Facebook
            </a>
          </div>
          <div className="share-option">
            <FaTwitter size={24} color="#1da1f2" />
            <a href={`https://twitter.com/intent/tweet?text=${shareText}`} target="_blank" rel="noopener noreferrer">
              Share on Twitter
            </a>
          </div>
          <div className="share-option">
            <FaLinkedin size={24} color="#0077b5" />
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${postLink}`} target="_blank" rel="noopener noreferrer">
              Share on LinkedIn
            </a>
          </div>
          <div className="share-option">
            <FaWhatsapp size={24} color="#25d366" />
            <a href={`https://api.whatsapp.com/send?text=${shareText}`} target="_blank" rel="noopener noreferrer">
              Share on WhatsApp
            </a>
          </div>
          <div className="share-option">
            <input type="text" readOnly value={postLink} />
            <button onClick={() => navigator.clipboard.writeText(postLink)}>Copy Link</button>
          </div>
          <div className="share-option">
            <button onClick={() => alert('Share within app feature coming soon!')}>Share within App</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
