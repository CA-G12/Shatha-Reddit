const addPostQuery = require('../../database/queries/addPostQuery')
const joi = require('joi')
const addPost=(req,res)=>{
    const {title,content,user_id} = req.body
const schema = joi.object({
    title: joi.string().required(),
    content: joi.string().required()
})
schema.validateAsync({title, content}).then(data=> addPostQuery(title,content,user_id))
.then(data=> res.json(data.rows)).then(console.log)

}

module.exports = addPost;