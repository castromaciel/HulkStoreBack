const { Schema, model } = require('mongoose')

const productSchema = new Schema(
  {
    name: String,
    price: Number,
    imgURL: String,
    stock: Number,
    quantity: 0
  }
)

module.exports = model('Product', productSchema)