import React, { useEffect, useState } from 'react';
import { PiArrowFatUp, PiArrowFatDownThin } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa";
import { GrPowerCycle } from "react-icons/gr";
import './Posts.css';
import AddPost from './Addpost';

const Posts = ({ user, searchQuery }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [commentText, setCommentText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const header = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODJmMDllOTVlMzg5ZmIxMjM1ZGMyZCIsImlhdCI6MTcxOTk5MTA1MCwiZXhwIjoxNzUxNTI3MDUwfQ.uJcBDToCRYd34LZ2ouRD_p539HNXbdyCnxakRhL6POw',
    'projectID': 'vmyitayk3fnu',
    'Content-Type': 'application/json'
  };

  const fetchPosts = async (page) => {
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/quora/post?page=${page}`, {
        headers: {
          ...header, 
          'projectID': 'vmyitayk3fnu' 
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(data.data);
        setFilteredPosts(data.data);
      } else {
        console.error('Error fetching posts:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    if (searchQuery && posts.length > 0) {
      setFilteredPosts(posts.filter(post => 
        post.title && post.title.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    } else {
      setFilteredPosts(posts);
    }
  }, [searchQuery, posts]);

  const deletePost = async (id) => {
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/quora/post/${id}`, {
        method: 'DELETE',
        headers: header
      });
      if (response.ok) {
        setPosts(prevPosts => prevPosts.filter(post => post._id !== id));
      } else {
        const data = await response.json();
        console.error('Error deleting post:', data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleContentVisibility = (id) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post._id === id ? { ...post, isVisible: !post.isVisible } : post
      )
    );
  };

  const handleUpvote = (id) => {
    if (!user.isLoggedIn) {
      alert('Please log in to upvote');
      return;
    }
    setPosts(prevPosts =>
      prevPosts.map(post =>
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
    setPosts(prevPosts =>
      prevPosts.map(post =>
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

    setPosts(prevPosts =>
      prevPosts.map(post =>
        post._id === postId ? { ...post, comments: [...(post.comments || []), newComment] } : post
      )
    );

    setCommentText("");
  };

  const handleReplySubmit = (postId, commentId, replyText) => {
    const newReply = {
      id: Date.now(),
      text: replyText,
    };

    setPosts(prevPosts =>
      prevPosts.map(post =>
        post._id === postId
          ? {
              ...post,
              comments: post.comments.map(comment =>
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
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post._id === postId
          ? {
              ...post,
              comments: post.comments.filter(comment => comment.id !== commentId),
            }
          : post
      )
    );
  };

  const handleDeleteReply = (postId, commentId, replyId) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post._id === postId
          ? {
              ...post,
              comments: post.comments.map(comment =>
                comment.id === commentId
                  ? {
                      ...comment,
                      replies: comment.replies.filter(reply => reply.id !== replyId),
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
      <AddPost isOpen={isOpen} onRequestClose={() => setIsOpen(false)} fetchPosts={() => fetchPosts(pageNumber)} />
      {filteredPosts.map(post => (
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
              {user.isLoggedIn && (
                <>
                  <button onClick={() => handleCommentSubmit(post._id)}>
                    <FaRegComment /> {post.comments?.length || 0} Comment
                  </button>
                  <button onClick={() => alert('Please log in to share')}><GrPowerCycle /> Share</button>
                </>
              )}
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
              {post.comments && post.comments.map(comment => (
                <div key={comment.id} className="comment">
                  <p>{comment.text}</p>
                  {user.isLoggedIn && (
                    <button className="delete-button" onClick={() => handleDeleteComment(post._id, comment.id)}>Delete</button>
                  )}
                  <div className="replies">
                    {comment.replies && comment.replies.map(reply => (
                      <div key={reply.id} className="reply">
                        <p>{reply.text}</p>
                        {user.isLoggedIn && (
                          <button className="delete-button" onClick={() => handleDeleteReply(post._id, comment.id, reply.id)}>Delete</button>
                        )}
                      </div>
                    ))}
                    {user.isLoggedIn && (
                      <div className="reply-input">
                        <input type="text" placeholder="Add a reply..." />
                        <button onClick={() => handleReplySubmit(post._id, comment.id, "new reply")}>Reply</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {user.isLoggedIn && (
            <div className="edit-delete">
              <button onClick={() => setIsOpen(true)}>Edit</button>
              <button onClick={() => deletePost(post._id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
      <div className="pagination">
        <button onClick={() => setPageNumber(prev => prev > 1 ? prev - 1 : prev)}>Previous</button>
        <button onClick={() => setPageNumber(prev => prev + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Posts;
