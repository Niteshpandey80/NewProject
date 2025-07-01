const express = require('express');
const cors = require('cors')
const authRouter = require('./routes/auth.js')
const connectToMongoDB = require('./db/db.js')
const noteRouter = require('./routes/note.js')

const app = express();
app.use(express.json())
app.use(cors())
app.use('/api/auth' , authRouter)
app.use('/api/note' , noteRouter)


app.get('/' , (req,res)=>{
    res.send("hello bro")
})

app.listen(3000 , ()=>{
    connectToMongoDB()
    console.log('runing at 3000')
})