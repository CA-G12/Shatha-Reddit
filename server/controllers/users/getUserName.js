const { verifyJwt } = require('../../utils/customJwt');
const customizedError = require('../../utils/customError');
const {getUserQuery} = require('../../database/queries/index');

const getUserName = (req, res, next) => {
  verifyJwt(req.cookies.token).then((decoded) => {
    console.log(decoded)
    if (decoded) {
      getUserQuery(decoded.user_id).then((data) => res.json(data.rows[0])).then(console.log);
    } else {
        // res.clearCookie('token').redirect('/')
      throw new customizedError(400, 'token is changed !');
    }
  }).catch(err=> next(err))
};

module.exports = getUserName;