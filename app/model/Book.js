// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BookSchema   = new Schema({
    id: String,
    author: String,
    content: String
});

module.exports = mongoose.model('Book', BookSchema);