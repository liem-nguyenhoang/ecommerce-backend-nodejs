'use strict'

import mongoose from 'mongoose'
import { countConnect } from '../helpers/check.connect.js'
import config from '../configs/config.mongodb.js'

const {
  db: { host, name, port },
} = config
const connectString = `mongodb://${host}:${port}/${name}`

class Database {
  constructor() {
    this.connect()
  }

  // connect
  connect() {
    mongoose.set('debug', true)
    mongoose.set('debug', { color: true })

    mongoose
      .connect(connectString, { maxPoolSize: 50 })
      .then(() => console.log(`Connected MongoDB Success`, countConnect()))
      .catch(err => console.log(`Error Connect! ${err.message}`))
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }

    return Database.instance
  }
}

const instanceMongodb = Database.getInstance()
export default instanceMongodb
