import Post from "../models/postmodel.js";

const authOwner = async (req, res, next) => {
    try {
        const postId = req.params.id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        req.post = post;
        next();

    } catch (error) {
        console.error("AUTH OWNER ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export default authOwner;
