const mongoose = require('mongoose')
const Schema = mongoose.Schema
const isPhoneNumber = require('../helper/isPhoneNumber')
const DepartmentSchema = new Schema({
    type : {
        type : String,
        enum : ['Subject', 'Laboratory'],
        default : 'Subject'
    },
    name : {
        type : String,
        required : true
    },
    address : {
        type : String
    },
    phoneNumber : {
        type : String,
        validate : {
            validator : isPhoneNumber,
            message : props => `${props.value} không phải là một số điện thoại hợp lệ`
        }
    },
    website : {
        type : String
    }
})

const Department = mongoose.model('Department', DepartmentSchema)

module.exports = Department