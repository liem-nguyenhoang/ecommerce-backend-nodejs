'use strict'

import keyTokenModel from '../models/keyToken.model.js'

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey }) => {
    try {
      console.log(`publicKey::`, publicKey)
      const publicKeyString = publicKey.toString()
      console.log(`publicKeyString::`, publicKeyString)
      const tokens = await keyTokenModel.create({
        user: userId,
        publicKey: publicKeyString,
      })

      return tokens ? tokens.publicKey : null
    } catch (error) {
      return error
    }
  }
}

export default KeyTokenService
