import React, { useState, useEffect } from 'react';
import { apiGet } from '../utils/api/axios';

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);
  const [similarPosts, setSimilarPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all posts
        const res = await apiGet('categories');
        setPosts(res.data.data);

        // Filter posts with a similar ID as the category ID
        const similarPosts = res.data.data.filter((post) => post.category === cat);
        setSimilarPosts(similarPosts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className='menu'>
      <h1>Other Posts you may like</h1>
      {similarPosts.map((post) => (
        <div className='post' key={post._id}>
          <img src={post.image} alt={post.title} />
          <h2>{post.title}</h2>
          <button>Read More</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
