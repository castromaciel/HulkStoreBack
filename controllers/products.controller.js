const Product = require('../models/Product')

const getProducts = async (req,res) => {
  const products = await Product.find()
  res.json(products)
}

const postProduct = async (req,res) =>{
  const newProduct = new Product(req.body)
  const productSaved = await newProduct.save()
  res.status(201).json(productSaved)
}

module.exports = {getProducts, postProduct}