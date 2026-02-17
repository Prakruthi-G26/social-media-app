import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    text :{
        type : String,
        required : true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
    }],
    comments: [{
        text: String,
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        createdAt: { type: Date, default: Date.now }
    }]
},  { timestamps: true });

const Post = mongoose.model("Post",postSchema);

export default Post;