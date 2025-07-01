const express = require('exprees')
const { route } = require('./auth')
const router = express.Router()
const Note = require('../models/Note.js')

route.post('/add' , async(req,res)=>{
    try {
        const {title , description} = req.body ; 
        const newNote = new Note({
             title ,
             description,
             
        })
    } catch (error) {
        
    }
})
module.exports = router ; 