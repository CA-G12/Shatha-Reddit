const router = require('express').Router();
const {
  getComments, getPosts, getUser, getVotes,
} = require('../controllers/index');

router.get('/posts', getPosts);
router.get('/votes/:id', getVotes);
router.get('/users/:id', getUser);
router.get('/comments/:id', getComments);
module.exports = router;
