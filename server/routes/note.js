const express = require('express');
const { route } = require('./auth')
const router = express.Router()
const Note = require('../models/Note.js')
const middleware = require('../middleware/middleware.js')

router.post('/add', middleware, async(req,res)=>{
    try {
        const {title , description} = req.body ; 
        const newNote = new Note({
             title ,
             description,
             userId:req.user.id
        });
        await newNote.save();
      return res.status(200).json({success:true , message:"Note Created Successfully" })
     } catch (error) {
        return res.status(500).json({success:false , message:"Error in Adding Note" })
     }
    }
)
module.exports = router ; 