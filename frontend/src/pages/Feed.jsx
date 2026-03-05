import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../components/PostCard';
//import CreatePost from './CreatePost';
import './feedpage.css'

const Feed = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  //const [newPost, setNewPost] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const token = localStorage.getItem('token');

  const refreshFeed = useCallback(async () => {
    const res = await axios.get('http://localhost:5000/api/posts');
    setPosts(res.data);
  }, []);

  useEffect(() => {
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setCurrentUserId(decoded.id);
      } catch (err) {
        console.log("invalid token",err);
      }
      refreshFeed();
    }
  }, [token, refreshFeed]);

  // const createPost = async (e) => {
  //   e.preventDefault();
  //   const res = await axios.post('http://localhost:5000/api/posts', 
  //     { content: newPost }, 
  //     { headers: { Authorization: `Bearer ${token}` } }
  //   );
  //   setPosts(prev => [res.data, ...prev]);
  //   setNewPost('');
  // };

  if (!token) return <div>Please log in</div>;

  return (
    <div className="home">

      <div className='navbar'>
      <div className="nav-left" onClick={() => navigate("/feed")}>
        🏠
      </div>

      <div className='nav-center'>Feed</div>
      
      <button onClick={() => navigate("/profile")} className='nav-right'><img src='/frontend/src/assets/account.png'></img></button>
      </div>

      <button onClick={() => navigate("/create")} className='create-btn'>+</button>
      <div className="feed">
        {posts.map(post => (
          <PostCard
            key={post._id}
            post={post}
            token={token}
            currentUserId={currentUserId}
            refreshFeed={refreshFeed}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
