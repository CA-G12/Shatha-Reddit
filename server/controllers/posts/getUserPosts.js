const {getUserPostsQuery}= require('../../database/queries/index');
const { verifyJwt } = require('../../utils/customJwt');

const getUserPosts = (req, res) => {
  console.log(req.cookies.token);
  verifyJwt(req.cookies.token).then((decoded) => getUserPostsQuery(decoded.user_id))
  .then((data) => res.json(data.rows))
    // .then(console.log)
    .catch((err) => console.log('err', err));
};

module.exports = getUserPosts;
