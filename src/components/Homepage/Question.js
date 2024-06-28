import React, { useState, useEffect } from 'react';
import './Question.css';

const Question = () => {
    const [questions, setQuestions] = useState([]);

    const header = {
        projectID: "vmyitayk3fnu"
    };

    const options = {
        method: 'GET',
        headers: header
    };

    async function fetchQuestions() {
        try {
            const response = await fetch('https://academics.newtonschool.co/api/v1/quora/post?limit=100', options);
            const data = await response.json();
            if (data.data) {
                setQuestions(data.data);
            } else {
                console.error('API response does not contain items:', data);
            }
            console.log("Fetched data:", data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    }

    useEffect(() => {
        fetchQuestions();
    }, []);

    return (
        <>
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
            <div className='question-cards'>
                {questions.map((question) => (
                    <div className="question-card" key={question._id}>
                        <div className="question-header">
                            <i className="fa-solid fa-user"></i>
                            <span>{question.author.name}</span>
                        </div>
                        <div className="question-content">
                            <h2>{question.title}</h2>
                            <p>{question.content}</p>
                            {question.images && <img src={question.images} alt={question.title} />}
                        </div>
                        <div className="question-footer">
                            <p>{new Date(question.createdAt).toLocaleString()}</p>
                            <div className="actions">
                                <button>Upvote {question.isLiked}</button>
                                <button>Downvote {question.isDisliked}</button>
                                <button>Comment</button>
                                <button>Share</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Question;
