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

const buyProduct = async (req,res) => {
  await req.body.forEach(async element => {
    try{
      let product = await Product.findOne({_id: element._id})
      if( product.stock <= 0) return res.status(404).json({msg:'No Stock'})

      product = await Product.findByIdAndUpdate(element._id, {stock: product.stock - element.quantity},{new: true} )
      return res.status(204).json()

    } catch (error){
      console.log(error)
    }
  });
}

module.exports = {getProducts, postProduct, buyProduct}