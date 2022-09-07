const router = require('express').Router();
const {signIn, getHomePage, signUp, logOut}= require('../controllers/authentication');
const {addComment, getComments} =require('../controllers/comments');
const {getPosts, addPost}= require('../controllers/posts');
const {getUser, getUserName}= require('../controllers/users')
const {getVotes,upVote,downVote}= require('../controllers/votes')

router.get('/posts', getPosts);
router.get('/votes/:id', getVotes);
// router.get('/users/:id', getUser);
router.get('/comments/:id', getComments);
router.post('/signup', signUp);
router.get('/home', getHomePage);
router.post('/signin', signIn);
router.post('/comments', addComment);
router.post('/posts', addPost);
router.get('/username', getUserName);
router.get('/logout', logOut)
router.post('/upvote', upVote);
router.post('/downvote', downVote);
module.exports = router;
