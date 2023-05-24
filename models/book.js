const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    year:{
        type: Number,
    },
    quantity:{
        type: Number,
    },
    imageURL:{
        type: String,
    } 
})

module.exports = mongoose.model('book', bookSchema)