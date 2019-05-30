const DepartmentService = require('../services/DepartmentService')
const {sendSuccess, sendError } = require('../helper/sendResponse')

exports.findById = (req, res) => {
    const {departmentId} = req.params

    DepartmentService.findById(departmentId)
        .then(sendSuccess(req, res))
        .catch(sendError(req, res))
}


exports.findAll = (req ,res) => {
    const {query} = req.body

    DepartmentService.findAll(query)
        .then(sendSuccess(req,res))
        .catch(sendError(req,res))
}

exports.findUsersByDepartment = (req ,res) => {
    const {departmentId} = req.params

    DepartmentService.findUsersByDepartment(departmentId)
        .then(sendSuccess(req,res))
        .catch(sendError(req,res))
}

exports.save = (req, res) => {
    const {payload} = req.body

    DepartmentService.save(payload)
        .then(sendSuccess(req, res))
}

exports.updateById = (req,res) => {
    const {departmentId} = req.params
    const {payload} = req.body

    DepartmentService.updateById({ departmentId, payload })
        .then(sendSuccess(req,res))
        .catch(sendError(req,res))
}

exports.removeById = (req,res) => {
    const {departmentId} = req.params

    DepartmentService.removeById(departmentId)
        .then(sendSuccess(req,res))
        .catch(sendError(req,res))
}