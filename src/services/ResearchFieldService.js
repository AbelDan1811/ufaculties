const ResearchField = require('../schemas/ResearchField')
const User = require('../schemas/User')
const Department = require('../schemas/Department')

exports.findAll = async () => {
    return await ResearchField 
        .find()
        .sort({
            name : 1
        })
        .lean()

}

exports.findUsersByField = async (fieldId) =>{
    return await User
        .find({
            $or : [ 
                {
                    researchFields : {
                        $elemMatch : {
                            $eq : fieldId
                        }
                    }
                },
                {
                    interestedFields : {
                        $elemMatch : {
                            $eq : fieldId
                        }
                    }
                }
            ]
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
exports.findById = async (fieldId) => {
    return await ResearchField
        .findOne({
            _id : fieldId
        })
        .lean()
}

exports.findRoots = async () => {
    return await ResearchField
        .find({
            parent : null
        })
        .sort({
            name : 1
        })
        .lean()
}

exports.findChildrenByParent = async (parentId) => {
    return await ResearchField
        .find({
            parent : parentId
        })
        .sort({
            name : 1
        })
        .lean()
}


exports.save = async(payload) => {
    const field = new ResearchField(payload)
    return await field.save()
}

exports.updateById = async({ fieldId, payload }) => {
    const updatedField = await ResearchField
        .findOneAndUpdate({
            _id : fieldId,
        },{
            $set : payload
        },{
            new : true
        })
    
    if (!updatedField)
        throw new Error(`Cann't find user with id ${fieldId}`)
    
    return updatedField
}

exports.removeById = async (fieldId) => {
    const field = await ResearchField
        .findOne({
            _id : fieldId
        })

    await field.remove()
}

