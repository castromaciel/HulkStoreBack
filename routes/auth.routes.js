const { Router } = require('express')
const { signUp, signIn } = require('../controllers/auth.controller')
const { body } = require('express-validator')
const { emailValidation, usernameValidation } = require('../helpers/users.validation')

const route = Router()
route.post('/signup', 
body('username').custom( usernameValidation ),
body('email').custom( emailValidation ), 
signUp)

route.post('/signin', signIn)

module.exports = route