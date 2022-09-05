const getUserQuery = require('../database/queries/getUserQuery');

const getUser = (req, res) => {
  const { id } = req.params;
  getUserQuery(id).then((data) => res.json(data.rows[0])).then(console.log);
};

module.exports = getUser;
