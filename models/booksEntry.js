const mongoose = require('mongoose');

const booksEntrySchema = new mongoose.Schema({

    title:
    {
        type: String,
        required: true
    },

    author:
    {
        type: String,
        required: true
    },

    year:
    {
        type: Number,
        'default': 0
    },

    comments:
    {
        type: String,
        'default': ''
    }
});

mongoose.model('BooksEntry', booksEntrySchema);