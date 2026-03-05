import { useState } from "react";
import axios from "axios";
import { timeAgo } from "./timeAgo"
import { HiCheck, HiX} from "react-icons/hi";
import { FaEdit, FaPaperPlane } from "react-icons/fa";
import { FaTrash, FaComment, FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";

const PostCard = ({ post, token, currentUserId, refreshFeed }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(post.text);

  const handleLike = async () => {
    await axios.put(
      `http://localhost:5000/api/posts/${post._id}/like`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    refreshFeed();
  };

  const handleComment = async (e) => {
    e.preventDefault();
    await axios.post(
      `http://localhost:5000/api/posts/${post._id}/comment`,
      { text: newComment },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    setNewComment("");
    refreshFeed();
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:5000/api/posts/${post._id}`,
      { text: editedText },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    setIsEditing(false);
    refreshFeed();
  };
  const handleDelete = async () => {
    if (window.confirm("Delete this post?")) {
      await axios.delete(`http://localhost:5000/api/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      refreshFeed();
    }
  };

  const isLiked = post.likes.some((like) => like._id === currentUserId);
  const isAuthor = post.author._id === currentUserId;

  return (
    <div className="post-card">
      <div className="post-header">
        <strong>{post.author.name}</strong>
        <small>{timeAgo(post.createdAt)}</small>
      </div>

      {isEditing ? (
        <form onSubmit={handleEdit}>
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <div className="edit-buttons">
            <button type="submit">
              <HiCheck size={20} color="black" />
            </button>
            <button type="button" onClick={() => setIsEditing(false)}>
              <HiX size={20} color="black" />
            </button>
          </div>
        </form>
      ) : (
        <p>{post.text}</p>
      )}

      <div className="post-actions">
        <button onClick={handleLike} className={isLiked ? "liked" : ""}>
          {isLiked ? <FaHeart size={22} color="red" /> : <FiHeart/>} {post.likes.length}
        </button>

        <button onClick={() => setShowComments(!showComments)}>
          <FaComment size={20} color="black" /> {post.comments.length}
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
            <button type="submit">
              <FaPaperPlane size={20} color="black" />
            </button>
          </form>

          <div className="comments">
            <p>Comments on this post</p>
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
          <button onClick={() => setIsEditing(true)}>
            <FaEdit size={22} color="black" />
            &nbsp; &nbsp;Edit
          </button>
          <button onClick={handleDelete} style={{ color: "red" }}>
            <FaTrash size={22} color="black" />
            &nbsp; &nbsp; Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
