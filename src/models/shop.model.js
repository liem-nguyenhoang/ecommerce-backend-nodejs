'use strict'

import mongoose from 'mongoose'

// const DOCUMENT_NAME = 'Shop'
// const COLLECTION_NAME = 'Shops'

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
})

//Export the model
export default mongoose.model('User', userSchema)
