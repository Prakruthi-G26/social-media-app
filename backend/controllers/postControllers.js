
import Post from "../models/postmodel.js";

export const createPost = async (req, res)=>{
    try{
        // console.log("BODY: ",req.user?.id);
        // console.log("USER: ",req.user);
        const {text} = req.body;
        if (!text || text.trim() === "") {
            return res.status(400).json({ message: "Text should not be empty" });
        }
        const newPost = await Post.create({text:text.trim(), author: req.user.id});
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: "create Server error" });
        console.log(error);
    }
};

export const editPost = async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({msg: "post not found"});

        if(post.author.toString()!==req.user.id){
            return res.status(403).json({msg: "not authorized"});
        }
        post.text = req.body.text;
        post.save();

        const updatedPost = await Post.findById(post.id).populate("author", "name").populate("comments.author", "name");
        res.json(updatedPost)
    } catch (error) {
        res.status(500).json({ message: "edit Server error" });
    }
};

export const deletePost = async (req, res)=>{
    try{
        await req.post.deleteOne();
        res.status(200).json("post deleted")
    } catch (error) {
        res.status(500).json({ message: "delete Server error" });
    }
};

export const allPosts = async (req, res) => {
    try{
        const posts = await Post.find().populate("author", "name").populate("comments.author","name").populate("likes","_id").sort({createdAt:-1})
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "all post Server error" });
    }
};

export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.user.id;

    const isLiked = post.likes.some(
      (like) => like.toString() === userId
    );

    if (isLiked) {
      post.likes.pull(userId); // unlike
    } else {
      post.likes.push(userId); // like
    }

    await post.save();

    res.status(200).json({ likes: post.likes.length });

  } catch (error) {
    console.error("LIKE ERROR:", error);
    res.status(500).json({ message: "like Server error" });
  }
};

export const createComment = async (req, res) => {
    try{
        const { text } = req.body;
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (!text || text.trim() === "") {
            return res.status(400).json({ message: "Text should not be empty" });
        }
        post.comments.push({text, author: req.user.id});
  
        await post.save();
        res.json(post.comments);
    } catch (error) {
        console.error("COMMENT ERROR:", error);
        res.status(500).json({ message: "COMMENT Server error" });
    }
};

export const myPosts = async(req, res)=>{
    const posts = await Post.find({author: req.user.id}).populate("author", "name").sort({createdAt: -1});
    res.json(posts);
    console.log(req.params.id)
}