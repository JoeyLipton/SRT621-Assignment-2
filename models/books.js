const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    bookTitle: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    amazonLink: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Books = mongoose.model('Books', bookSchema);
module.exports = Books;


