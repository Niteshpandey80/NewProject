const express = require('express')
const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const middleware = require('../middleware/middleware.js')

const router = express.Router()

router.post('/register' , async(req,res)=>{
     try {
        const {name,email, password} = req.body;
        const  user = await User.findOne({email})
        if(user){
            return res.status(401).json({success:false , message:"User Alreay exist"})
        }
        const hashPassword = await bcrypt.hash(password , 10)
        const newUser = new User({
            name , email , password:hashPassword
        })
        await newUser.save()
        return res.status(200).json({success:true , message:"Account Created Successfully" })
     } catch (error) {
        return res.status(500).json({success:false , message:"Error in Adding user" })
     }
})
router.post('/login' , async(req,res)=>{
     try {
        const {email, password} = req.body;
        const  user = await User.findOne({email})
        if(!user){
            return res.status(401).json({success:false , message:"Wrong credentials" })
        }
        const checkpassword = await bcrypt.compare(password , user.password)
        if(!checkpassword){
            return res.status(401).json({success:false , massage:"Wrong Credentials "})
        }
        const token = jwt.sign({id:user._id} , "secretkeynoteapp12#" , {expiresIn:"5h"})
        return res.status(200).json({success:true,token , user:{name:user.name} ,message:"Login Successfully" })
     } catch (error) {
        return res.status(500).json({success:false , message:"Error in Login Server" })
     }
});
router.get('/verify' , middleware ,  async(req,res)=>{
  return res.status(200).json({success:true , user:req.user})
})
module.exports = router