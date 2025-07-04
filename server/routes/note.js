const express = require('express');
const Note = require('../models/Note.js');
const middleware = require('../middleware/middleware.js');

const router = express.Router();

router.post('/add', middleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Title and Description are required" });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized user" });
    }

    const newNote = new Note({
      title,
      description,
      userId: req.user.id,
    });

    await newNote.save();

    return res.status(200).json({ success: true, message: "Note Created Successfully" });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Error in Adding Note" });
  }
});
router.get("/" , async(req,res)=>{
  try {
    const notes = await Note.find()
    return res.status(200).json({success:true , notes})
  } catch (error) {
    return res.status(500).json({success:false  , message:"can't retrive notes"})
  }
})

module.exports = router;
