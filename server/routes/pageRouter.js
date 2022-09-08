const postRouter = require('express').Router();

const {
    signIn, getHomePage, signUp, logOut,
  } = require('../controllers/authentication');

  postRouter.get('/home', getHomePage);
  postRouter.post('/signin', signIn);
  postRouter.get('/logout', logOut);
  postRouter.post('/signup', signUp);

  module.exports = postRouter;