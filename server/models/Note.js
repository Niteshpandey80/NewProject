const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
  title:{type:String , required:true , maxlength:[30 , "Title cannot exceed 10 characters"]},
  description:{type:String , required:true , maxlength:[70 , "desciption should be less the or exqual to 70 char"]},
  userId:{type:mongoose.Schema.Types.ObjectId , ref:'User'},
})
const Note = mongoose.model('Note' , NoteSchema)
module.exports = Note ; 