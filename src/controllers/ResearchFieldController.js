const ResearchFieldService = require('../services/ResearchFieldService')
const {sendSuccess, sendError } = require('../helper/sendResponse')

exports.findRoots = (req, res) => {
    ResearchFieldService.findRoots()
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}

exports.findAll = (req ,res) => {
    ResearchFieldService.findAll()
        .then(sendSuccess(req,res))
        .catch(sendError(req,res))
}

exports.findUsersByField = (req,res) => {
    const { fieldId } = req.params

    ResearchFieldService.findUsersByField(fieldId)
        .then(sendSuccess(req,res))
        .catch(sendError(req,res))
}

exports.findChildrenByParent = (req ,res) => {
    const { fieldId } = req.params

    ResearchFieldService.findChildrenByParent(fieldId)
        .then(sendSuccess(req,res))
        .catch(sendError(req,res))
}

exports.save = (req, res) => {
    const {payload} = req.body

    ResearchFieldService.save(payload)
        .then(sendSuccess(req, res))
}

exports.updateById = (req,res) => {
    const {fieldId} = req.params
    const {payload} = req.body

    ResearchFieldService.updateById({ fieldId, payload })
        .then(sendSuccess(req,res))
        .catch(sendError(req,res))
}

exports.removeById = (req,res) => {
    const {fieldId} = req.params

    ResearchFieldService.removeById(fieldId)
        .then(sendSuccess(req,res))
        .catch(sendError(req,res))
}

exports.findById = (req, res) => {
    const {fieldId} = req.params

    ResearchFieldService.findById(fieldId)
        .then(sendSuccess(req,res))
        .catch(sendError(req,res))
}