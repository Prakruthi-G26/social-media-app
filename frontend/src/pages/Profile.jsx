import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import './profilepage.css'
import './feedpage.css'
const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(res.data);

      // fetch posts of this user
      const postRes = await axios.get(
        `http://localhost:5000/api/myposts`, {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log(res.data._id);

      setPosts(postRes.data);

    } catch (err) {
      console.log(err);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-page">

      {/* User Details */}
      <div className="profile-header">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>Total Posts: {posts.length}</p>
      </div>

      {/* User Posts */}
      <div className="profile-posts">
        {posts.map(post => (
          <PostCard
            key={post._id}
            post={post}
            token={token}
            currentUserId={user._id}
            refreshFeed={fetchProfile}
          />
        ))}
      </div>

    </div>
  );
};

export default Profile;
