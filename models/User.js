const { Schema, model} = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  ]
})

module.exports = model('User', userSchema)
