// import
const Note = require("../models/note");

const fetchNotes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page, default to 1
    const perPage = parseInt(req.query.perPage) || 10; // Items per page, default to 10

    const totalNotes = await Note.countDocuments(); // Total number of notes

    const totalPages = Math.ceil(totalNotes / perPage); // Calculate total pages

    const notes = await Note.find({}, null, {
      skip: (page - 1) * perPage, // Calculate the skip value
      limit: perPage, // Limit the results per page
    });

    res.json({ notes, totalPages, totalNotes });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const fetchNote = async (req, res) => {
  // get id off the url
  const noteId = req.params.id;

  // find the note using that id
  const note = await Note.findById(noteId);

  // respond with the note
  res.json({ note });
};

const createNote = async (req, res) => {
  // get the sent in data off request body
  const { title, body, email } = req.body;

  // find the latest note to determine the next displayId
  const latestNote = await Note.findOne({}, {}, { sort: { displayId: -1 } });

  const displayId = latestNote ? latestNote.displayId + 1 : 1;

  // create a note with it
  const note = await Note.create({
    title,
    body,
    email,
    displayId,
  });

  // respond with the new note
  res.json({ note });
};

const updateNote = async (req, res) => {
  // get id off the url
  const noteId = req.params.id;
  //   get the data off the req body
  const { title, body, email } = req.body;

  // find and update the record
  await Note.findByIdAndUpdate(noteId, {
    title,
    body,
    email,
  });

  //   find updated note
  const note = await Note.findById(noteId);

  // respond with it
  res.json({ note });
};

const deleteNote = async (req, res) => {
  // get id off url
  const noteId = req.params.id;

  // delete the record
  await Note.deleteOne({ _id: noteId });
  //  respond
  res.json({ success: "record deleted" });
};

module.exports = {
  fetchNotes,
  fetchNote,
  createNote,
  updateNote,
  deleteNote,
};
