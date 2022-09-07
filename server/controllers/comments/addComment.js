const addCommentQuery = require('../../database/queries/addCommentQuery');
const { verifyJwt } = require('../../utils/customJwt');

const addComment = (req, res) => {
  const { comment, post_id } = req.body;
  console.log(comment, post_id);
  verifyJwt(req.cookies.token).then((decoded) => addCommentQuery(comment, decoded.user_id, post_id))
    .then((data) => res.json(data.rows[0])).then(console.log)
    .catch((err) => console.log('err comment', err));
};

module.exports = addComment;

// data.rows.map(ele=>{
//     ele.user_name= decoded.user_name
//     ele.count= 0
// })
