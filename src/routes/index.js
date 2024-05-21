'use strict'

import express from 'express'
import accessRouter from './access/index.js'

const router = express.Router()

router.use('/v1/api', accessRouter)
// router.get('', (req, res) => {
//   return res.status(200).json({
//     message: 'Hello World',
//   })
// })

export default router
