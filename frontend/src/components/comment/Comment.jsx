import React, { useState, useEffect } from 'react';
import { apiGet, apiPost } from '../../utils/api/axios';
import PropTypes from 'prop-types';

const Comment = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  Comment.propTypes = {
    postId: PropTypes.string.isRequired,
  };

  useEffect(() => {
    // fetch comments for the post
    apiGet(`comments`).then((data) => {
      // filter comments based on postId
      const filteredComments = data.filter((comment) => comment.data.data.post === postId);
      setComments(filteredComments);
    });
  }, [postId]);

  const handleNewCommentSubmit = async (event) => {
    event.preventDefault();

    // create new comment
    if (postId && newComment) {
      try {
        const data = await apiPost('comments', { post: postId, description: newComment });
        setComments([...comments, data]);
        setNewComment('');
      } catch (error) {
        console.log(error.msg);
      }
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      {comments.map((comment) => (
        <div key={comment._id}>{comment.data.data.description}</div>
      ))}
      <form onSubmit={handleNewCommentSubmit}>
        <label>
          New comment:
          <input
            type="text"
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Comment;
