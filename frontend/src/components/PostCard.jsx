import { useState } from 'react';
import axios from 'axios';

const PostCard = ({ post, token, currentUserId, refreshFeed }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(post.text);

  const handleLike = async () => {
    await axios.put(`http://localhost:5000/api/posts/${post._id}/like`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    refreshFeed();
  };

  const handleComment = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:5000/api/posts/${post._id}/comment`, 
      { text: newComment }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setNewComment('');
    refreshFeed();
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/posts/${post._id}`,
        {text: editedText},
        {headers: { Authorization: `Bearer ${token}`}}
    );
    setIsEditing(false);
    refreshFeed();
  }
  const handleDelete = async () => {
    if (window.confirm('Delete this post?')) {
      await axios.delete(`http://localhost:5000/api/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      refreshFeed();
    }
  };

  const isLiked = post.likes.some(like => like._id === currentUserId);
  const isAuthor = post.author._id === currentUserId;

  return (
    <div className="post-card">
      <div className="post-header">
        <strong>{post.author.name}</strong>
        <small>{new Date(post.createdAt).toLocaleString()}</small>
      </div>
      
      {isEditing ? (
  <form onSubmit={handleEdit}>
    <textarea
      value={editedText}
      onChange={(e) => setEditedText(e.target.value)}
    />
    <button type="submit">Save</button>
    <button type="button" onClick={() => setIsEditing(false)}>
      Cancel
    </button>
  </form>
) : (
  <p>{post.text}</p>
)}

      
      <div className="post-actions">
        <button onClick={handleLike} className={isLiked ? 'liked' : ''}>
          {isLiked ? '❤️' : '🤍'} {post.likes.length}
        </button>
        
        <button onClick={() => setShowComments(!showComments)}>
          💬 {post.comments.length}
        </button>
      </div>

      {showComments && (
        <>
          <form onSubmit={handleComment} className="comment-form">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
            />
            <button type="submit">Post</button>
          </form>
          
          <div className="comments">
            {post.comments.map((comment, idx) => (
              <div key={comment._id} className="comment">
                <strong>{comment.author.name}:</strong> {comment.text}
              </div>
            ))}
          </div>
        </>
      )}

      {isAuthor && (
        <div className="author-actions">
          <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
          <button onClick={handleDelete} style={{ color: 'red' }}>🗑️ Delete</button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
