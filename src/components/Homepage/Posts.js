import React, { useEffect, useState } from 'react';
import { PiArrowFatUp, PiArrowFatDownThin } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa";
import { GrPowerCycle } from "react-icons/gr";
import './Posts.css';

const Posts = ({ user, setUser }) => {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [commentText, setCommentText] = useState("");

  const header = {
    projectID: "vmyitayk3fnu"
  };

  const options = {
    method: 'GET',
    headers: header
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/quora/post?limit=10&page=${pageNumber}`, options);
      const data = await response.json();
      setPosts(data.data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [pageNumber]);

  const toggleContentVisibility = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === id ? { ...post, isVisible: !post.isVisible } : post
      )
    );
  };

  const handleUpvote = (id) => {
    if (!user.isLoggedIn) {
      alert('Please log in to upvote');
      return;
    }
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === id
          ? {
              ...post,
              isLiked: !post.isLiked,
              isDisliked: post.isLiked ? post.isDisliked : false,
              likeCount: post.isLiked ? post.likeCount - 1 : post.likeCount + 1,
              dislikeCount: post.isLiked && post.isDisliked ? post.dislikeCount - 1 : post.dislikeCount,
            }
          : post
      )
    );
  };

  const handleDownvote = (id) => {
    if (!user.isLoggedIn) {
      alert('Please log in to downvote');
      return;
    }
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === id
          ? {
              ...post,
              isDisliked: !post.isDisliked,
              isLiked: post.isDisliked ? post.isLiked : false,
              dislikeCount: post.isDisliked ? post.dislikeCount - 1 : post.dislikeCount + 1,
              likeCount: post.isDisliked && post.isLiked ? post.likeCount - 1 : post.likeCount,
            }
          : post
      )
    );
  };

  const handleCommentSubmit = (postId) => {
    if (!user.isLoggedIn) {
      alert('Please log in to comment');
      return;
    }
    const newComment = {
      id: Date.now(),
      text: commentText,
      replies: [],
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, comments: [...(post.comments || []), newComment] } : post
      )
    );

    setCommentText("");
  };

  const handleReplySubmit = (postId, commentId, replyText) => {
    if (!user.isLoggedIn) {
      alert('Please log in to reply');
      return;
    }
    const newReply = {
      id: Date.now(),
      text: replyText,
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, replies: [...(comment.replies || []), newReply] }
                  : comment
              ),
            }
          : post
      )
    );
  };

  const handleDeleteComment = (postId, commentId) => {
    if (!user.isLoggedIn) {
      alert('Please log in to delete comment');
      return;
    }
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? {
              ...post,
              comments: post.comments.filter((comment) => comment.id !== commentId),
            }
          : post
      )
    );
  };

  const handleDeleteReply = (postId, commentId, replyId) => {
    if (!user.isLoggedIn) {
      alert('Please log in to delete reply');
      return;
    }
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? {
                      ...comment,
                      replies: comment.replies.filter((reply) => reply.id !== replyId),
                    }
                  : comment
              ),
            }
          : post
      )
    );
  };

  return (
    <div className='posts'>
      {posts.map((post) => (
        <div className="posts-card" key={post._id}>
          <div className="posts-header">
          {post.author.profileImage ? (
                <img src={post.author.profileImage} alt="Profile" />
            ) : (
                <i className="fa-solid fa-user"></i>
            )} 
            <span>{post.author.name}</span>
            <span className="follow"><a href="#">·Follow</a></span>
            <p className="posts-date">{new Date(post.createdAt).toLocaleString()}</p>
          </div>
          <div className="posts-content">
            <h2 onClick={() => toggleContentVisibility(post._id)}>{post.title}?</h2>
            {post.isVisible && (
              <>
                <p>{post.content}</p>
                {post.images && <img src={post.images} alt="post content"/>}
              </>
            )}
          </div>
          <div className="posts-footer">
            <div className="actions">
              <button className="upvote" onClick={() => handleUpvote(post._id)}>
                <PiArrowFatUp /> {post.likeCount || 0} Upvote
              </button>
              <button className="downvote" onClick={() => handleDownvote(post._id)}>
                <PiArrowFatDownThin /> {post.dislikeCount || 0} Downvote
              </button>
              <button onClick={() => alert('Please log in to comment')}>
                <FaRegComment /> {post.comments?.length || 0} Comment
              </button>
              <button onClick={() => alert('Please log in to share')}><GrPowerCycle /> Share</button>
            </div>
            <i className="fa-solid fa-ellipsis"></i>
          </div>
          {post.isVisible && (
            <div className="comments-section">
              <div className="comments-input">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                />
                <button className="comment-button" onClick={() => handleCommentSubmit(post._id)}>Add Comment</button>
              </div>
              {post.comments && post.comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <p>{comment.text}</p>
                  <button className="delete-button" onClick={() => handleDeleteComment(post._id, comment.id)}>Delete</button>
                  <div className="replies">
                    {comment.replies && comment.replies.map((reply) => (
                      <div key={reply.id} className="reply">
                        <p>{reply.text}</p>
                        <button className="delete-button" onClick={() => handleDeleteReply(post._id, comment.id, reply.id)}>Delete</button>
                      </div>
                    ))}
                    <input
                      type="text"
                      placeholder="Reply..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim() !== "") {
                          handleReplySubmit(post._id, comment.id, e.target.value);
                          e.target.value = "";
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className="pagination-buttons">
        <button className="pagination-button" onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))} disabled={pageNumber === 1}>Previous</button>
        <button className="pagination-button" onClick={() => setPageNumber(prev => prev + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Posts;
