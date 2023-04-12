const CreateError = require("http-errors");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const getuserfollowing = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userID } = req.payload;
        const user = User.findOne({ _id: userID });
        if (!user) throw CreateError.NotFound("User not found");
        user.following.push(id);
        user.save();
        res.status(200).json({ 
            message: "User followed", 
            following: user.following
        });
    } catch (err) {
        next(err);
    }
};

const unfollow = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userID } = req.payload;
        const user = User.findOne({ _id: userID });
        if (!user) throw CreateError.NotFound("User not found");
        user.following.pull(id);
        user.save();
        res.status(200).json({
            message: "User unfollowed",
            following: user.following
        });
    } catch (err) {
        next(err);
    }
};

const getuserprofile = async (req, res, next) => {
    try {
        const { userID } = req.payload;
        const user = User.findOne({ _id: userID });
        if (!user) throw CreateError.NotFound("User not found");
        res.status(200).json({
            message: "User profile",
            UserName: user.name,
            UserEmail: user.email,
            UserFollowing: user.following,
        });
    } catch (err) {
        next(err);
    }
};

const createpost = async (req, res, next) => {
    try {
        const { userID } = req.payload;
        const { title, body } = req.body;
        const user = User.findOne({ _id: userID });
        if (!user) throw CreateError.NotFound("User not found");
        const post = { postID: Math.floor(Math.random() * 1000000000000), title: title, description: body, createdAt: new Date() }
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