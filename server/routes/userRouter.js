const userRouter = require('express').Router();

const { addComment, getComments } = require('../controllers/comments');
const { getPosts, addPost} = require('../controllers/posts');
const { getUserName } = require('../controllers/users');
const { getVotes, upVote, downVote } = require('../controllers/votes');

userRouter.get('/posts', getPosts);
userRouter.get('/votes/:id', getVotes);
userRouter.get('/comments/:id', getComments);
userRouter.post('/comments', addComment);
userRouter.post('/posts', addPost);
userRouter.get('/username', getUserName);
userRouter.post('/upvote', upVote);
userRouter.post('/downvote', downVote);

module.exports = userRouter;