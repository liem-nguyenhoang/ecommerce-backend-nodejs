'use strict'

import shopModel from '../models/shop.model.js'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import KeyTokenService from './keyToken.service.js'
import { createTokenPair } from '../auth/authUtils.js'
import { getInfoData } from '../utils/index.js'

const RoleShop = {
  SHOP: '001',
  WRITER: '002',
  EDITOR: '003',
  ADMIN: '004',
}
class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      // step1: check email exists ?
      const holderShop = await shopModel.findOne({ email }).lean()
      if (holderShop) {
        return {
          code: 'xxx',
          message: 'Shop already registered!',
        }
      }

      const passwordHash = await bcrypt.hash(password, 10)
      console.log('object 1')
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RoleShop.SHOP],
      })
      if (newShop) {
        // created privateKey, publicKey
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
          },
          privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
          },
        })

        // save collection KeyStore
        console.log({ privateKey, publicKey })

        const publicKeyString = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
        })

        if (!publicKeyString) {
          return {
            code: 'xxx',
            message: 'keyStore error',
          }
        }
        console.log(`publicKeyString::`, publicKeyString)
        const publicKeyObject = crypto.createPublicKey(publicKeyString)

        console.log(`publicKeyObject::`, publicKeyObject)
        // create token pair
        const tokens = await createTokenPair(
          { userId: newShop._id, email },
          publicKeyObject,
          privateKey,
        )
        console.log(`Created Token Success::`, tokens)

        return {
          code: 201,
          metadata: {
            shop: getInfoData({
              fields: ['_id', 'name', 'email'],
              object: newShop,
            }),
            tokens,
          },
        }
      }
      return {
        code: 200,
        metadata: null,
      }
    } catch (error) {
      return {
        code: 'xxx',
        message: error.message,
        status: 'error',
      }
    }
  }
}

export default AccessService
