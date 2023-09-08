const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const content = process.argv[3]
const important = process.argv[4]

const url =
    `mongodb+srv://admin:${password}@fullstackopen.pltibcy.mongodb.net/noteApp?
    retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const person = new Note({
    content: content,
    important: important,
})

if (process.argv.length === 3) {
    Note.find({}).then(result => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })
}

person.save().then(result => {
    console.log(`added ${content} with important: ${important} to note database`)
    mongoose.connection.close()
})