require('dotenv').config()
const jwt = require('jsonwebtoken')
const Role = require('../models/Role')
const User = require('../models/User')

const verifyToken = async ( req, res, next ) => {
  try {
    const token = req.headers['access-token']
    if(!token) return res(403).json({msg:'No token provided'})
    
    const decoded = jwt.verify(token, process.env.SECRET)
    req.userId = decoded.id
    const user = await User.findById(req.userId, {password:0})
    if(!user) return res.status(404).json({message: 'User not found'})
    next()

  } catch (error) {
    return res.status(401).json({message: 'Unauthorized'})
  }
}

const isAdmin = async (req, res, next) => {

  const token = req.headers['access-token']
  if(!token) return res(403).json({msg:'No token provided'})
  const decoded = jwt.verify(token, process.env.SECRET)
  req.userId = decoded.id

  const user = await User.findById(req.userId, {password:0})
  const roles = await Role.find( {_id: {$in: user.roles}} )
  
  for (let i = 0; i < roles.length; i++){
    if(roles[i].name === "admin"){
      next();
      return;
    }
  }

  return res.status(403).json({message: "Require Admin role"})
}

module.exports = { verifyToken, isAdmin }