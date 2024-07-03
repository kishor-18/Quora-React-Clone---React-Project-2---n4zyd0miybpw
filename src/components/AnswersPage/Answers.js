import React, { useState, useEffect } from 'react';
import Navbar from '../Homepage/Navbar';
import './Answers.css';
import Ad from '../Homepage/Ad';
import '../../styles/App.css';
import Sidebar from '../Homepage/Sidebar';
import AddPost from '../Homepage/Addpost';

const Answers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questions, setQuestions] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    fetchQuestions(); // Refresh questions after closing the modal
  };

  const fetchQuestions = () => {
    fetch('https://academics.newtonschool.co/api/v1/quora/post', {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODJmMDllOTVlMzg5ZmIxMjM1ZGMyZCIsImlhdCI6MTcxOTk5MTA1MCwiZXhwIjoxNzUxNTI3MDUwfQ.uJcBDToCRYd34LZ2ouRD_p539HNXbdyCnxakRhL6POw',
        'projectID': 'vmyitayk3fnu',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.data)) {
          setQuestions(data.data);
        } else {
          console.error('Expected an array but got:', data);
          setQuestions([]); // Fallback to empty array
        }
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
        setQuestions([]); // Fallback to empty array
      });
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <button onClick={openModal}>Add Question/Post</button>
      <AddPost isOpen={isModalOpen} onRequestClose={closeModal} />
      <div className="content">
        <div className="questions">
          {questions.map(question => (
            <div key={question._id} className="question-card">
              <h3>{question.title}</h3>
              <p>{question.content}</p>
              {question.images && <img src={question.images} alt="question" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Answers;
