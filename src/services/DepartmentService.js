const Department = require('../schemas/Department')
const User = require('../schemas/User')

exports.findAll = async (query) => {
    return await Department
        .find(query)
        .select('')
        .sort({
            name : 1
        })
        .lean()        
}


exports.findById = async (departmentId) => {
    return await Department
        .findOne({
            _id : departmentId
        })
        .select('')
        .lean()
}

exports.save = async (payload) => {
    const department = new Department(payload) 
    return await department.save()
}

exports.findUsersByDepartment = async (departmentId) => {
    return await User 
        .find({
            department : departmentId,
            role : 'teacher'
        })
        .select('_id firstName lastName degree')
        .populate({
            path : 'department',
            select : 'name',
            model : Department
        })
        .sort({
            firstName : 1
        })
        .lean()
}

exports.updateById = async ({ departmentId, payload }) => {
    const updatedDepartment = await Department
        .findOneAndUpdate({
            _id : departmentId,
        },{
            $set : payload
        },{
            new : true
        })
    
    if (!updatedDepartment)
        throw new Error(`Cann't find user with id ${departmentId}`)
    
    return updatedDepartment
}

exports.removeById = async (departmentId) => {
    return await Department 
        .findOneAndRemove({
            _id : departmentId
        })
}