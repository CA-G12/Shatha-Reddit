const { join } = require('path');
const { readFileSync } = require('fs');
const connection = require('./connection');

const dbBuild = () => {
  const sql = readFileSync(join(__dirname, 'init.sql')).toString();
  return connection.query(sql);
};

module.exports = dbBuild;
