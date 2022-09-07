const upVoteQuery = require('../../database/queries/upVoteQuery');
const {verifyJwt}=require('../../utils/customJwt')
const upVote = (req,res)=>{
  const  {post_id} = req.body;
verifyJwt(req.cookies.token).then(decoded=>   upVoteQuery(post_id, decoded.user_id))
  .then(data=> res.json(data.rows)).then(console.log)
}
module.exports = upVote;