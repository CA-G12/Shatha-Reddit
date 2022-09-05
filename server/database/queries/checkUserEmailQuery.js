const connection = require('../config/connection');

const checkUserEmailQuery=(email)=>{
    return connection.query('select user_name from users where email=$1',[email])
}

module.exports= checkUserEmailQuery;