import React, { useState, useEffect } from 'react';
import { apiGet } from '../../utils/api/axios';
import { useParams } from 'react-router-dom';
import {toast} from 'react-toastify'

const SinglePost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGet(`post/${postId}`);
        setPost(response.data.data);
      } catch (error) {
        setError('Failed to fetch data');
        toast.error(error.message);
      }
    };

    fetchData();
  }, [postId]);

  return (
    <div className='single-post'>
      <h2 className='post_title'>{post.title}</h2>
      <p className='post_body'>{post.body}</p>
      <p className='post_category'>Category: {post.category?.title}</p>
      <p className='post_author'>Author: {post.author?.name}</p>
      <p className='post-pub'>Published: {new Date(post.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default SinglePost;
