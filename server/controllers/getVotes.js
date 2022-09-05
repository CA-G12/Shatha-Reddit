const getVotesQuery = require('../database/queries/getVotesQuery');

const getVotes = (req, res) => {
  const { id } = req.params;
  getVotesQuery(id).then((data) => res.json(data.rows))
    .then(console.log);
};

module.exports = getVotes;
