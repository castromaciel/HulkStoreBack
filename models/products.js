const { Schema, model } = require('mongoose')

const product = new Schema(
  {
    name: String,
    price: Number,
    imgURL: String,
    stock: Number
  }
)

module.exports = model('Product', product)