const CreateError = require("http-errors");
const User = require("../models/User.model");
const Post = require("../models/Post.model");

const createpost = async (req, res, next) => {
    try {
        const { userID } = req.payload;
        const { title, description } = req.body;
        const user = await User.findOne({ _id: userID });
        if (!user) throw CreateError.NotFound("User not found");
        const post = new Post({
            title,
            description,
            createdBy: userID,
            createdAt: Date.now(),
            likes: [],
            comments: []
        });
        post.save().then(post => {
            user.posts.push(post);
            user.save();
            res.status(200).json({
                message: "Post created",
                PostId: post._id,
                PostTitle: post.title,
                PostDescription: post.description,
                PostCreatedAt: post.createdAt,
                PostCreatedBy: post.createdBy,
            });
    });
    } catch (err) {
        next(err);
    }
};

const deletepost = async (req, res, next) => {
    try{
        const {id} = req.params;
        const {userID} = req.payload;
        const user = await User.findOne({ _id: userID });
        if (!user) throw CreateError.NotFound("User not found");
        const post = user.posts.find(post => post._id == id);
        if (!post) throw CreateError.NotFound("Post not found");
        await Post.deleteOne({ _id: id });
        const newposts = user.posts.filter(post => post._id != id);
        user.posts = newposts;
        user.save();
        res.status(200).json({
            message: "Post deleted",
            PostId: id,
            UserPosts: user.posts
        });
    } catch (err) {
        next(err);
    }
};

const likepost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userID } = req.payload;
        const user = await User.findOne({ _id: userID });
        if (!user) throw CreateError.NotFound("User not found");
        const post = await Post.findOne({ _id: id });
        if (!post) throw CreateError.NotFound("Post not found");
        if(post.likes.includes(userID)) throw CreateError.Conflict("Post already liked");
        post.likes.push(userID);
        post.save();
        res.status(200).json({
            message: "Post liked",
            PostId: post._id,
            PostLikes: post.likes.length
        });
    } catch (err) {
        next(err);
    }
};

const unlikepost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userID } = req.payload;
        const user = await User.findOne({ _id: userID });
        if (!user) throw CreateError.NotFound("User not found");
        const post = await Post.findOne({ _id: id });
        if (!post) throw CreateError.NotFound("Post not found");
        if(!post.likes.includes(userID)) throw CreateError.Conflict("Post already unliked");
        const newlikes = post.likes.filter(like => like != userID);
        post.likes = newlikes;
        post.save();
        res.status(200).json({
            message: "Post unliked",
            PostId: post._id,
            PostLikes: post.likes.length
        });
    } catch (err) {
        next(err);
    }
};

const addcomment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userID } = req.payload;
        const user = await User.findOne({ _id: userID });
        if (!user) throw CreateError.NotFound("User not found");
        const post = await Post.findOne({ _id: id });
        if (!post) throw CreateError.NotFound("Post not found");
        const comment = { commentID: Math.floor(Math.random() * 1000000000000), comment: req.body.comment, createdAt: new Date(), commentedBy: userID }
        post.comments.push(comment);
        post.save();
        res.status(200).json({
            message: "Post commented",
            comment: comment
        });
    } catch (err) {
        next(err);
    }
};

const getpost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userID } = req.payload;
        const user = await User.findOne({ _id: userID });
        if (!user) throw CreateError.NotFound("User not found");
        const post = await Post.findOne({ _id: id });
        if (!post) throw CreateError.NotFound("Post not found");
        res.status(200).json({
            message: "Post found",
            PostId: post._id,
            PostTitle: post.title,
            PostDescription: post.description,
            PostCreatedAt: post.createdAt,
            PostCreatedBy: post.createdBy,
            PostLikes: post.likes.length,
            PostComments: post.comments
        });
    } catch (err) {
        next(err);
    }
};

const getallposts = async (req, res, next) => {

    try {
        const { userID } = req.payload;
        const user = await User.findOne({ _id: userID });
        if (!user) throw CreateError.NotFound("User not found");
        //get all posts created by authenticated user sorted by post time.
        const posts = await Post.find({ createdBy: userID }).sort({ createdAt: -1 });
        res.status(200).json({
            message: "Posts found",
            Posts: posts
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createpost,
    deletepost,
    likepost,
    unlikepost,
    addcomment,
    getpost,
    getallposts
};