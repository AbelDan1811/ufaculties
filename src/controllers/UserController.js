const UserService = require('../services/UserService')
const {sendSuccess, sendError } = require('../helper/sendResponse')
const isNumeric = require('../helper/isNumeric')


exports.findById = (req, res) => {
    const {userId} = req.params

    UserService.findById(userId)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}


exports.findAll = (req ,res) => {
    const {query} = req.body
    const {page,size} = req.query

    const validatedPage = isNumeric( (page + '').trim()) ? parseInt(page,10) : 1
    const validatedSize = isNumeric( (size + '').trim()) ? parseInt(size,10) : 10


    UserService.findAll({query, page : validatedPage, size : validatedSize })
        .then(sendSuccess(req,res))
        .catch(sendError(req,res))
}

exports.save = (req, res) => {
    const {payload} = req.body

    UserService.save(payload)
        .then(sendSuccess(req, res))
        .catch(sendError(req,res))

}

exports.updateById = (req,res) => {
    const {userId} = req.params
    const {payload} = req.body

    UserService.updateById({ userId, payload })
        .then(sendSuccess(req,res))
        .catch(sendError(req,res))
}

exports.removeById = (req,res) => {
    const {userId} = req.params

    UserService.removeById(userId)
        .then(sendSuccess(req,res))
        .catch(sendError(req,res))
}

exports.findDistinctTypes = (req,res) => {

    UserService.findDistinctTypes()
        .then(sendSuccess(req,res))
        .catch(sendError(req,res))
}

exports.findDistinctDegrees = (req, res) => {

    UserService.findDistinctDegrees()
        .then(sendSuccess(req,res))
        .catch(sendError(req,res))
}

exports.selectFields = (req, res)=>{
    const {userId} = req.params
    const {fields} = req.query

    const validatedFields = ((fields + "").trim()).split(',').join(' ')

    UserService.selectFields({ userId, fields : validatedFields}) 
        .then(sendSuccess(req,res))
        .catch(sendError(req,res))

}

exports.updateResearchFields = (req, res) => {
    const {userId} = req.params
    const {fields} = req.body

    UserService.updateResearchFields({ userId, fieldIds : fields })
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.bulkSave = (req, res) => {
    const excelFile = req.file

    UserService.bulkSave(excelFile)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}