const express = require('express');
const postsRoutes = express.Router();


const Post = require("../../models/Post.model");

//get all
postsRoutes.route('/').get(function(req, res) {
    Post.find(function(err, posts) {
        if (err)
            res.json(err);
        else
            res.json(posts);
    });
});

//get by image id
postsRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Post.findById(id, function(err, post) {
        res.json(post);
    });
});

//adding new post
postsRoutes.route('/add').post(function(req, res) {
    let post = new Post(req.body);
    post.save().then(user => {
        res.status(200).json({'post': 'post added succesfully'});
    })
    .catch(err => {
        res.status(400).send('adding new post failed: ' + err);
    });
});

//delete by ID
postsRoutes.route('/delete/:id').delete(function(req, res) {
    Post.findById(req.params.id).remove(function(err, post) {
        if (err)
            res.send(err);
        else
            res.send("successfully deleted");
    });
});

//find all images of a user
postsRoutes.route('/search/:userId').get(function(req, res) {
    let userId = req.params.userId;
    Post.find({userId:  userId}, function(err, post) {
        if (err)
            res.send(err);
        else
            res.json(post);
    });
});

module.exports = postsRoutes;