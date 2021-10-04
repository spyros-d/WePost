const mongoose = require('mongoose');
const Article = require('../models/article')


const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Author', authorSchema);