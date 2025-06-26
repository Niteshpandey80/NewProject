const mongoose = require('mongoose');
const connectToMongoDB = async()=>{
  try{
    await mongoose.connect('mongodb://127.0.0.1:27017/note_app');
    console.log("Connected to Mongodb")
  }catch(error){
    console.log("Error Connecting to MongoDB" , error.message)
  }
}
module.exports =  connectToMongoDB ;