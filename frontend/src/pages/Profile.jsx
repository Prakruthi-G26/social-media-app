import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { BsGrid3X3 } from "react-icons/bs";
import "./profilepage.css";
import "./feedpage.css";
const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data);

      // fetch posts of this user
      const postRes = await axios.get(`http://localhost:5000/api/myposts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data._id);

      setPosts(postRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <div className="profile-nav">
        <FiArrowLeft className="back-icon" onClick={() => navigate("/feed")} />
        <h3>Profile</h3>
      </div>

      {/* User Details */}
      <div className="profile-header">
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Total Posts: {posts.length}</p>
      </div>
      <div className="profile-tabs">
        <span>
          <BsGrid3X3 />&nbsp; Posts
        </span>
      </div>

      {/* User Posts */}
      <div className="profile-posts fade-in">
        <div className="profile-grid">
          {posts.map((post) => (
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
    </div>
  );
};

export default Profile;
