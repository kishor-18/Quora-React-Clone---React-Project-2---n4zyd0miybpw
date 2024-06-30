import React, { useEffect, useState } from 'react';
import './Posts.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1); // Initial page is set to 1
  const [totalPages, setTotalPages] = useState(1); // Initial total pages

  const header = {
    projectID: "vmyitayk3fnu"
  };

  const options = {
    method: 'GET',
    headers: header
  };

  // Function to fetch posts
  const fetchPosts = async (pageNumber) => {
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/quora/post?limit=10&page=${pageNumber}`, options);
      const data = await response.json();
      if (data.data !== null) {
        setPosts(data.data);
        console.log(data);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Function to handle next page
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  // Function to handle previous page
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    fetchPosts(posts);
  }, [page]);

  return (
    <div>
      <div className='posts-cards'>
        {posts.map((post) => (
          <div className="posts-card" key={post._id}>
            <div className="posts-header">
              <img src={post.author.image} alt={post.author.name} />
              <span>{post.author.name}</span>
            </div>
            <div className="posts-content">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              {post.images && <img src={post.images} alt={post.title} />}
            </div>
            <div className="posts-footer">
              <p>{new Date(post.createdAt).toLocaleString()}</p>
              <div className="actions">
                <i className="fa-solid fa-thumbs-up"></i>
                <button>Upvote {post.isLiked}</button>
                <i className="fa-solid fa-thumbs-down"></i>
                <button>Downvote {post.isDisliked}</button>
                <i className="fa-solid fa-message"></i>
                <button>Comment</button>
                <i className="fa-solid fa-share"></i>
                <button>Share</button>
              </div>
              <i className="fa-solid fa-ellipsis"></i>
              <i className="fa-solid fa-bookmark"></i>
            </div>
          </div>
        ))}
        <div className="pagination-buttons">
          <button
            className="previous-page"
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            Previous Page
          </button>
          <button
            className="next-page"
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Posts;