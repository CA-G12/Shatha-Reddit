const addPostQuery = require('../../database/queries/addPostQuery')
const joi = require('joi')
const customizeError = require('../../utils/customError')
const {verifyJwt} = require('../../utils/customJwt')
const addPost=(req,res)=>{
    const {title,content} = req.body
    console.log(req.cookies.token)
const schema = joi.object({
    title: joi.string().required(),
    content: joi.string().required()
})
schema.validateAsync({title, content}).then(data=>{
    verifyJwt(req.cookies.token).then(decoded=>   addPostQuery(title,content,decoded.user_id))
    .then(data=> res.json(data.rows)).then(console.log)
})
.catch(err=> console.log('errr', err))

}


module.exports = addPost;