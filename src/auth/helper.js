const jwt = require('jsonwebtoken')
const getConfig = require('../config/env')

exports.encodeToken = async ( payload ) => {
    const secretKey = getConfig('secretKey') 

    return await jwt.sign(payload ,secretKey, {
        expiresIn : 86400 * 7
    })
}

exports.decodeToken = async (token) => {
    if (!token)
        throw new Error('Token is not provided!')

    const secretKey = getConfig('secretKey')
    
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, payload) => {
            if (err) 
                return reject(new Error('Invalid token!'))
            return resolve(payload)
        })
    })
    
}

exports.getAccessToken = (req) => {
    const authHeader = (req.headers['authorization'] || '').trim()

    if (authHeader) {
        return authHeader.replace('Bearer ', '').trim()
    }

    return null
}