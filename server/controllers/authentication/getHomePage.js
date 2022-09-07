const { join } = require('path');
const { verifyJwt } = require('../../utils/customJwt');

const getHomePage = (req, res) => {
  if (req.cookies.token) {
    verifyJwt(req.cookies.token).then((data) => res.sendFile(join(__dirname, '..', '..', '..', 'private-home', 'home.html')))
      .catch((err) => res.clearCookie('token').redirect('/'));
  } else {
    res.redirect('/');
  }
};

module.exports = getHomePage;
