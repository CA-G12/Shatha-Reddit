const logOut =(req,res)=>{
    res.clearCookie('token').clearCookie('user_id').clearCookie('user_name').json('clear Cookie')
}
module.exports = logOut;