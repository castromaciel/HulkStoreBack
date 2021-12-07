const { Router } = require('express')
const { getProducts, postProduct, buyProduct } = require('../controllers/products.controller')
const { verifyToken, isAdmin  } = require('../middleware/authJwt')
const route = Router()

route.get('/', verifyToken ,getProducts)
route.post('/', [verifyToken, isAdmin] , postProduct)
route.put('/',verifyToken, buyProduct)

module.exports = route
