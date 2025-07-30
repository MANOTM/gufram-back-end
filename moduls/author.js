const mongoose = require('mongoose');


const authorSchema = new mongoose.Schema({
  name: String, 
  img: String, 
}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema);
