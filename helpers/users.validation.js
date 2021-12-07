const User =  require('../models/User')

const emailValidation = async (email) =>{
  const mail = await User.findOne( {email} ) 
  if(mail) throw new Error ('Email already exists')
  
}

const usernameValidation = async(username) =>{
  const user = await User.findOne( {username} )
  if(user) throw new Error ('User already exists')
}

module.exports = { emailValidation, usernameValidation }