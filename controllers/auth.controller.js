require('dotenv').config()
const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signUp = async (req,res) => {
  const {username, email, password, roles} = req.body

  // const userFound = User.find({email})

  const newUser = new User({
    username,
    email,
    password
  })

  const salt = bcrypt.genSaltSync()
  newUser.password = bcrypt.hashSync(password, salt)

  if(roles) {
    const foundRoles= await Role.find({name: {$in: roles}})
    newUser.roles = foundRoles.map(role => role._id)
  } else{
    const role = await Role.findOne({name: "user"})
    newUser.roles = [role._id]
  }

  const savedUser = await newUser.save()

  const token = jwt.sign({id: savedUser._id}, process.env.SECRET,{expiresIn: 86400})
  res.status(200).json({token})
}

const signIn = async (req,res) => {
  const userFound = await User.findOne({email: req.body.email}).populate("roles")
  if(!userFound) return res.status(400).json({msg:"User not found"})
  
  const matchPassword = bcrypt.compareSync(req.body.password, userFound.password)

  if(!matchPassword) return res.status(401).json({msg:'Wrong user', token: null})

  const token = jwt.sign({id: userFound._id}, process.env.SECRET, {expiresIn: 86400})
  res.json({token})
}

module.exports = { signUp, signIn }
