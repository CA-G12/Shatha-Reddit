const {getPostsQuery} = require('../../database/queries/index');

const getPosts = ((req, res) => {
  getPostsQuery().then((data) => res.json(data.rows)).then(console.log)
    .catch((err) => console.log(err));
});

module.exports = getPosts;
