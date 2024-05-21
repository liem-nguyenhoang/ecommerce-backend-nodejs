'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import routers from './routes/index.js'
import instanceMongodb from './dbs/init.mongodb.js'

const app = express()

// init middlewares
app.use(morgan('combined'))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  }),
)

// init db
instanceMongodb

// init routes
app.use('/', routers)

// handling errors

export default app
