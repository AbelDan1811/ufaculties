const AuthService = require('../services/AuthService')
const {sendSuccess, sendError } = require('../helper/sendResponse')

exports.signIn = (req, res) => {
    const {username, password} = req.body

    const validatedUsername = (username + '').trim()
    const validatedPassword = (password + '').trim()

    AuthService.signIn({ username : validatedUsername, password : validatedPassword })
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}


exports.registerAsAdmin = (req,res) => {
    const {payload} = req.body

    AuthService.registerAsAdmin(payload)
        .then(sendSuccess(req,res))
        .catch(sendError(req,res))

}
