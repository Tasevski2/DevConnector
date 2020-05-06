const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const Post = require('../../models/Post');
const User = require('../../models/User');

// @route     POST api/posts
// @desc      Create post
// @access    Private
router.post('/', [auth, [
    check('text')
        .notEmpty().withMessage('Text is required!')
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors});
    }
    
    try {
        const author = await User.findOne({ _id: req.user.id}).select(['name', 'avatar']);

        const fields = {
            user: req.user.id,
            text: req.body.text,
            name: author.name,
            avatar: author.avatar ? author.avatar : null
        };
        const post = new Post(fields);
        post.save();
        res.status(200).json(post);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ msg: "Server error!"});
    }
});

// @route     GET api/posts
// @desc      Get all posts
// @access    Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({date: -1});
        res.status(200).json({posts});
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ msg: "Server error!"});
    }
});

// @route     GET api/posts/:post_id
// @desc      Get single post by id
// @access    Private
router.get('/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.post_id});
        if(!post) return res.status(404).json({ msg: "Post not found!"});
        
        return res.status(200).json({post});
    } catch (err) {
        console.log(err.message);
        const validate = mongoose.isValidObjectId(req.params.post_id);
        if(!validate) return res.status(400).json({ msg: "Post not found!!"});
        return res.status(500).json({ msg: "Server error!"});
    }
});

// @route     DELETE api/posts/:post_id
// @desc      Delete post by id
// @access    Private
router.delete('/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.post_id });
        if(!post) return res.status(400).json({ msg: "Can not delete not existing post!"});
        if(post.user.toString() !== req.user.id) return res.status(401).json({ msg: "Not allowed!"});

        await post.remove();

        return res.status(200).json({ msg: "Post deleted!"});
    } catch (err) {
        console.log(err.message);
        const validate = mongoose.isValidObjectId(req.params.post_id);
        if(!validate) return res.status(400).json({ msg: 'Now allowed!!'});
        return res.status(500).json({ msg: "Server error!"});
    }
});

// @route     PUT api/posts/like/:post_id
// @desc      Like a post
// @access    Private
router.put('/like/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.post_id});

        // Check if the post is already liked by the user
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) return res.status(400).json({ msg: "Already liked!"});

        post.likes.unshift({ user: req.user.id});
        await post.save();
        // return res.status(200).json(newLikes); Podobra opcija zatoa sto ima pomalku rabota na front-endot
        return res.status(200).json(req.user.id);

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ msg: "Server error!"});
    }
});

// @route     DELETE api/posts/unlike/:post_id
// @desc      Remove like from post
// @access    Private
router.delete('/unlike/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.post_id});

        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) return res.status(400).json({ msg: "You can not unlike an unliked post!"});

        const newLikes = post.likes.filter(like => like.user.toString() !== req.user.id);

        post.likes = [...newLikes];
        await post.save();
        // return res.status(200).json(newLikes); Podobra opcija zatoa sto ima pomalku rabota na front-endot
        return res.status(200).json(req.user.id);

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ msg: "Server error!"});
    }
});

// @route     PUT api/posts/comment/:post_id
// @desc      Comment on a post
// @access    Private
router.put('/comment/:post_id', [ auth, [
    check('text')
        .notEmpty().withMessage('Text is required!')
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors});

    try {
        const commentUser = await User.findOne({ _id: req.user.id}).select(['name', 'avatar']);
        const post = await Post.findOne({ _id: req.params.post_id }).select('comments'); 
        if(!post) return res.status(400).json({ msg: "The post doesn't exists!"});
        const comment = {
            user: req.user.id,
            text: req.body.text,
            name: commentUser.name,
            avatar: commentUser.avatar ? commentUser.avatar : null
        };
        post.comments.push(comment);
        await post.save();

        res.status(200).json(comment);
    } catch (err) {
        console.log(err.message);
        const validate = mongoose.isValidObjectId(req.params.post_id);
        if(!validate) return res.status(404).json({ msg: "Post not found!"});
        return res.status(500).json({ msg: "Server error!"});
    }
});

// @route     DELETE api/posts/comment/:post_id/:comment_id
// @desc      Delete a comment by the post user or the comment user
// @access    Private
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.post_id});
        if(!post) return res.status(400).json({ msg: "Post not found!"});
        const comment = post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length;
        if (comment <= 0) return res.status(400).json({ msg: "Comment not found!" });
        // Check if the post owner is the one who is deleting
        // if (post.user.toString() !== req.user.id) return res.status(400).json({ msg: "You can't delete someone's else comment!" });

        // Check if the comment owner is deleting his comment
        // if((post.comments.filter(comment => comment.user.toString() === req.user.id).length < 0) && (post.user !== req.user.id)) return res.status(400).json({ msg: "You can't delete someone's else comment!"});
        if(post.comments.filter(comment => comment.user.toString() === req.user.id).length < 0) return res.status(400).json({ msg: "You can't delete someone's else comment!"});


        const newComments = post.comments.filter(comment => comment._id.toString() !== req.params.comment_id);
        post.comments = [...newComments];
        await post.save();

        return res.status(200).json({ msg: "Comment deleted!"});

    } catch (err) {
        console.log(err.message);
        const validatePost = mongoose.isValidObjectId(req.params.post_id);
        if (!validatePost) return res.status(404).json({ msg: "Post not found!" });
        const validateComment = mongoose.isValidObjectId(req.params.comment_id);
        if (!validateComment) return res.status(404).json({ msg: "Comment not found!" });
        return res.status(500).json({ msg: "Server error!" });
    }
});

// @route     GET api/posts/comments/:post_id
// @desc      Get all comments of a post
// @access    Private
router.get('/comments/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.post_id}).select('comments');
        if(!post) return res.status(404).json({ msg: "Post not found"});
        return res.status(200).json({ comments: post.comments});
    } catch (err) {
        console.log(err.message);
        const validate = mongoose.isValidObjectId(req.params.post_id);
        if (!validate) return res.status(404).json({ msg: "Post not found!" });
        return res.status(500).json({ msg: "Server error!" });
    }
});



module.exports = router;