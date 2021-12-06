const { Router } = require('express')
const { signUp, signIn } = require('../controllers/auth.controller')

const route = Router()


route.post('/signup', signUp)
route.post('/signin', signIn)

module.exports = route