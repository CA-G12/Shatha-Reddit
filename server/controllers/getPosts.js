const getPostsQuery = require('../database/queries/getPostsQuery');

const getPosts = ((req, res) => {
  getPostsQuery().then((data) => res.json(data.rows)).then(console.log)
    .catch((err) => console.log(err));
});

module.exports = getPosts;
