const router = require('express').Router();
const {
  getComments, getPosts, getUser, getVotes, signUp, getHomePage,signIn
} = require('../controllers/index');

router.get('/posts', getPosts);
router.get('/votes/:id', getVotes);
router.get('/users/:id', getUser);
router.get('/comments/:id', getComments);
router.post('/signup', signUp);
router.get('/home', getHomePage);
router.post('/signin', signIn)
module.exports = router;
