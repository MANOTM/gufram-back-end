const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  name: String,
  title: String,
  desc: String,
  img: String,
  year: {
    type: Number,
    default: () => new Date().getFullYear()
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
