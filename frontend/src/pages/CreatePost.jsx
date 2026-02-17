import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './createpost.css'

function CreatePost() {
  const navigate = useNavigate();

  const [text, setText] = useState("");

  async function handleCreate(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/posts",
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/feed");

    } catch (error) {
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Failed to create post");
      }
      console.log(error);
    }
  }

  return (
    <div className="create-page">
      <div className="create-card">
      <h1>Create Post</h1>

      <form onSubmit={handleCreate}>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Content"
          required
        />

        <button type="submit">Create</button>
      </form>
    </div></div>
  );
}

export default CreatePost;
