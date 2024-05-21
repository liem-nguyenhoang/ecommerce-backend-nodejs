'use strict'

import AccessService from '../services/access.service.js'

class AccessController {
  signUp = async (req, res, next) => {
    try {
      console.log(`[P]::signUp::`, req.body)

      /**
       * 200 OK
       * 201 Created
       */
      return res.status(201).json(await AccessService.signUp(req.body))
    } catch (error) {
      next(error)
    }
  }
}

let controller = new AccessController()

export default controller
