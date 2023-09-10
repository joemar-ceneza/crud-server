// import
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  body: String,
  email: String,
  displayId: Number,
});

const Note = mongoose.model("Note", noteSchema);

// export
module.exports = Note;
