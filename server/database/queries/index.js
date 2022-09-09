const { addCommentQuery, getCommentsQuery } = require('./comments');
const {
  addPostQuery, deletePostQuery, getPostsQuery, getUserPostsQuery,
} = require('./posts');
const { checkUserEmailQuery, getUserQuery, addUserQuery } = require('./users');
const { upVoteQuery, downVoteQuery } = require('./votes');

module.exports = {
  addCommentQuery,
  addPostQuery,
  addUserQuery,
  checkUserEmailQuery,
  deletePostQuery,
  downVoteQuery,
  getCommentsQuery,
  getPostsQuery,
  getUserPostsQuery,
  getUserQuery,
  upVoteQuery,
};
