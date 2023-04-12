const CreateError = require("http-errors");
const User = require("../models/User");

const createpost = async (req, res, next) => {
    try {
        const { userID } = req.payload;
        const { title, body } = req.body;
        const user = User.findOne({ _id: userID });
        if (!user) throw CreateError.NotFound("User not found");
        const post = { postID: Math.floor(Math.random() * 1000000000000), title: title, description: body, createdAt: new Date(), likes: 0, comments: [] }
        user.posts.push(post);
        user.save();
        res.status(200).json({
            message: "Post created",
            PostId: post.postID,
            PostTitle: post.title,
            PostDescription: post.description,
            PostCreatedAt: post.createdAt
        });
    } catch (err) {
        next(err);
    }
};

const deletepost = async (req, res, next) => {
    try{
        const {id} = req.params;
        const {userID} = req.payload;
        const user = User.findOne({ _id: userID });
        if (!user) throw CreateError.NotFound("User not found");
        user.posts.pull({postID: id});
        user.save();
        res.status(200).json({
            message: "Post deleted",
            PostId: id
        });
    } catch (err) {
        next(err);
    }
};

const likepost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userID } = req.payload;
        const user = User.findOne({ _id: userID });
        if (!user) throw CreateError.NotFound("User not found");
        const post = user.posts.find(post => post.postID == id);
        if (!post) throw CreateError.NotFound("Post not found");
        post.likes += 1;
        user.save();
        res.status(200).json({
            message: "Post liked",
            PostId: post.postID,
            PostLikes: post.likes
        });
    } catch (err) {
        next(err);
    }
};

const unlikepost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userID } = req.payload;
        const user = User.findOne({ _id: userID });
        if (!user) throw CreateError.NotFound("User not found");
        const post = user.posts.find(post => post.postID == id);
        if (!post) throw CreateError.NotFound("Post not found");
        post.likes -= 1;
        user.save();
        res.status(200).json({
            message: "Post unliked",
            PostId: post.postID,
            PostLikes: post.likes
        });
    } catch (err) {
        next(err);
    }
};

const addcomment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userID } = req.payload;
        const user = User.findOne({ _id: userID });
        if (!user) throw CreateError.NotFound("User not found");
        const post = user.posts.find(post => post.postID == id);
        if (!post) throw CreateError.NotFound("Post not found");
        const comment = { commentID: Math.floor(Math.random() * 1000000000000), comment: req.body.comment, createdAt: new Date() }
        post.comments.push(comment);
        user.save();
        res.status(200).json({
            message: "Post commented",
            PostId: post.postID,
            PostComments: post.comments
        });
    } catch (err) {
        next(err);
    }
};

const getpost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userID } = req.payload;
        const user = User.findOne({ _id: userID });
        if (!user) throw CreateError.NotFound("User not found");
        const post = user.posts.find(post => post.postID == id);
        if (!post) throw CreateError.NotFound("Post not found");
        res.status(200).json({
            message: "Post found",
            PostId: post.postID,
            PostTitle: post.title,
            PostDescription: post.description,
            PostCreatedAt: post.createdAt,
            PostLikes: post.likes,
            PostComments: post.comments
        });
    } catch (err) {
        next(err);
    }
};

const getallposts = async (req, res, next) => {

    try {
        const { userID } = req.payload;
        const user = User.findOne({ _id: userID });
        if (!user) throw CreateError.NotFound("User not found");
        //get all posts created by authenticated user sorted by post time.
        const posts = user.posts.sort((a, b) => b.createdAt - a.createdAt);
        res.status(200).json({
            message: "All posts",
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