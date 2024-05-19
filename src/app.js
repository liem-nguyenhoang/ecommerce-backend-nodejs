'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import { checkOverload } from './helpers/check.connect.js'

const app = express()

// init middlewares
app.use(morgan('combined'))
app.use(helmet())
app.use(compression())

// init db
import instanceMongodb from './dbs/init.mongodb.js'
instanceMongodb
checkOverload()

// init routes
app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Hello World',
  })
})

// handling errors

export default app
