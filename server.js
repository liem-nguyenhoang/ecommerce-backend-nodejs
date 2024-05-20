'use strict'

import app from './src/app.js'
import config from './src/configs/config.mongodb.js'

app.listen(config.app.port, () => {
  console.log(`WSV eCommerce start with ${config.app.port}`)
})
