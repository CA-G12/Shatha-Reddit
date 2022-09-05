const handleClientError = (req, res) => {
  res.status(404).json('Not Found');
};

const handleServerError = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ msg: err.msg, status: err.status });
  } else {
    res.status(500).json('Server Error');
  }
};

module.exports = { handleClientError, handleServerError };
