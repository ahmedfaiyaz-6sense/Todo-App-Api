const jsonWebToken = require("jsonwebtoken")
require('dotenv').config()

const verify_jwt=(req,res,next)=>{
    const auth_token= req.headers.authorization
    try{
        const token = auth_token.split('Bearer ')[1]
        const decoded= jsonWebToken.verify(token,process.env.PRIVATE_KEY)
        const {username,id}=decoded
        req.username=username
        req.userId=id
        req.loginSuccess=true
        next()
    }catch{
        req.loginSuccess=false
        res.send({
            status:"Failed",
            message:"You are not logged in"
        })
    }
}   
module.exports=verify_jwt