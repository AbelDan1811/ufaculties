const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {UserSchema} = require('./User')

const ProjectSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    researchField : {
        type : Schema.Types.ObjectId,
        ref : 'ResearchField'
    },
    teachers : {
        type : [Schema.Types.ObjectId],
        ref : 'User',
        default : []
    }
})

ProjectSchema.index({
    title : 1
})

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project