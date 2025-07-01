const jwt = require('jsonwebtoken');
const User = require("../models/User.js")

const middleware = async(req,res,next)=>{
   try {
    const token =req.header.authorization.split('')[1]
    if(!token){
        return res.stutus(401).json({success:false  , message:"Unauthorized"})
    }
    const decoded = jwt.verify(token , 'secretkeynoteapp12#' );
    if(!decoded){
        return res.stutus(401).json({success:false , message:"Wrong token"})
    }
    const user = await User.findById({_id:decoded.id})
    if(!user){
         return res.stutus(404).json({success:false , message:"No User "})
    }
    const newUser = {name:user.name , id:user_id}
    req.user = newUser
    next()
   } catch (error) {
     return res.stutus(500).json({success:false , message:"Please Login "})
   }
}
module.exports = middleware ; 