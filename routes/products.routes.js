const { Router } = require('express')
const { getProducts, postProduct } = require('../controllers/products.controller')

const route = Router()

route.get('/', getProducts)
route.post('/', postProduct)

module.exports = route
