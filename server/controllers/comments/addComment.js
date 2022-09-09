const {addCommentQuery} = require('../../database/queries/index');
const { verifyJwt } = require('../../utils/customJwt');

const addComment = (req, res) => {
  const { comment, post_id } = req.body;
  verifyJwt(req.cookies.token).then((decoded) => addCommentQuery(comment, decoded.user_id, post_id))
    .then((data) => res.json(data.rows[0]))
    .catch((err) => res.clearCookie('token').redirect('/'));
};

module.exports = addComment;


