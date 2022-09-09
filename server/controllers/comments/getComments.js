const {getCommentsQuery} = require('../../database/queries/index');

const getComments = (req, res) => {
  const { id } = req.params;
  getCommentsQuery(id).then((data) => res.json(data.rows)).then(console.log);
};

module.exports = getComments;
