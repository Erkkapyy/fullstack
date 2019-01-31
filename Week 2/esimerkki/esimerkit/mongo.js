const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log("give password as argument")
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb://fullstack:${password}@ds253284.mlab.com:53284/fullstack2019-persons`

mongoose.connect(
  url,
  { useNewUrlParser: true }
)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
})

const Note = mongoose.model("Note", noteSchema)

const note = new Note({
  content: "Helppoa kuin heinän teko jäbät",
  date: new Date(),
  important: true
})

note.save().then(response => {
  console.log("note saved!")
  mongoose.connection.close()
})
