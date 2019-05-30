const User = require('../schemas/User')
const Department = require('../schemas/Department')
const ResearchField = require('../schemas/ResearchField')
const validateName = require('../helper/validateName')
const _ = require('lodash')
const parseExcelFile = require('../helper/parseExcelFile')

exports.findAll = async ({ query, page, size }) => {
    const skip = (page - 1) * size

    const _getUsers = User 
        .find(query)
        .select('-password')
        .populate({
            path : 'department',
            select : 'type name',
            model : Department 
        })
        .populate({
            path : 'researchFields',
            select : 'name',
            model : ResearchField
        })
        .populate({
            path : 'interestedFields',
            select : 'name',
            model : ResearchField
        })
        .sort({
            firstName : 1,
            lastName : 1
        })
        .skip(skip)
        .limit(size)
        .lean()
    
    const _getTotal = User.countDocuments(query)
    
    const [ totalUsers , users ] = await Promise.all([
        _getTotal,
        _getUsers
    ])

    const totalPages = Math.ceil( totalUsers / size)

    return {
        total : totalUsers,
        totalPages,
        currentPage : page,
        size,
        users
    }
}

exports.findDistinctTypes = async () => {
    return await User
        .distinct("officerType")
}

exports.findDistinctDegrees = async () => {
    return await User
        .distinct("degree")
}

exports.findById = async ( userId ) => {
    return await User
        .findOne({
            _id : userId
        })
        .select('-password')
        .populate({
            path : 'department',
            select : 'type name phoneNumber address website',
            model : Department 
        })
        .populate({
            path : 'researchFields',
            select : 'name',
            model : ResearchField
        })
        .populate({
            path : 'interestedFields',
            select : 'name',
            model : ResearchField
        })
        .lean()
}

exports.save = async (payload) => {
    const {fullName} = payload
    if (!fullName) 
        throw new Error('Missing fullName!')

    const splitedName = await validateName(fullName)

    const validatedPayload = Object.assign({}, payload, splitedName)
    const newUser = new User(validatedPayload)
    const savedUser = await newUser.save()
    savedUser.password = undefined

    return savedUser
}

exports.bulkSave = async (excelFile) => {
    const payloads = await parseExcelFile(excelFile)
    
    const savedUsers = await Promise.all(payloads.map( async payload => {
        const {fullName} = payload
        if (!fullName) 
            throw new Error('Missing fullName!')

        const splitedName = await validateName(fullName)

        const validatedPayload = Object.assign({}, payload, splitedName)
        const newUser = new User(validatedPayload)
        const savedUser = await newUser.save()
        savedUser.password = undefined

        return savedUser
    }))

    return savedUsers
}

exports.updateById = async ({ userId , payload }) => {
    const updated = Date.now()
    
    const {fullName} = payload
    const splitedName = await validateName(fullName)

    const validatedPayload = Object.assign({}, payload, splitedName, {updated})
    
    const updatedUser = await User
        .findOneAndUpdate({
            _id : userId
        }, {
            $set : validatedPayload
        }, {
            new : true
        })
    
    if (!updatedUser)
        throw new Error(`Cann't find user with id ${userId}`)

    updatedUser.password = undefined
    return updatedUser
}

exports.removeById = async (userId) => {
    return await User
        .findOneAndRemove({
            _id : userId
        })
}

exports.selectFields = async({userId, fields}) => {
    return await User
        .findOne({
            _id : userId
        })
        .select(fields)
        .lean()
}

exports.updateResearchFields = async ({ userId, fieldIds }) => {
    const nodes = await Promise.all(fieldIds.map( id => _addParentsToNode({ fieldId : id})))
    const validatedNodes = await _.union(...nodes)
    const interestedFields = validatedNodes.filter(node => fieldIds.indexOf(node) == -1 )

    const updatedUser = await User
        .findOneAndUpdate({
            _id : userId
        },{
            $set : { 
                researchFields : fieldIds,
                interestedFields : interestedFields
            }
        }, {
            new : true
        })
    if (!updatedUser)
        throw new Error(`Cann't find user with id ${userId}`)
    updatedUser.password = undefined
    return updatedUser
}

const _addParentsToNode = async ({ fieldId }) => {
    if (fieldId === null) 
        return []

    const { parent } = await ResearchField
        .findOne({
            _id : fieldId
        })
        .select('parent')
    
    const fulfilledNodes = await _addParentsToNode({ fieldId : parent})
    fulfilledNodes.push(fieldId)

    return fulfilledNodes 
}