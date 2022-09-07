const downVoteQuery = require('../../database/queries/downVoteQuery');
const {verifyJwt } = require('../../utils/customJwt');
const downVote = (req,res)=>{
  const  {post_id} = req.body;
verifyJwt(req.cookies.token).then(decoded=>{
 return downVoteQuery(post_id,decoded.user_id);
}).then(data=> res.json(data.rows)).then(console.log);
};
module.exports = downVote;