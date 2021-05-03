let mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
    unique: true
  },
  data:{
    type: [],
    required: true
  }
})

module.exports = mongoose.model('product', productSchema);