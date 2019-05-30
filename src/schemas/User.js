const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const isPhoneNumber = require('../helper/isPhoneNumber')
const isVnuEmail = require('../helper/isVnuEmail')

const UserSchema = new Schema({
    username : {
        type : String, 
        unique : true,
        required : true
    },
    password : {
        type :String,
        required : true
    },
    role : {
        type : String,
        enum : ['admin','teacher'],
        default : 'teacher',
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        validate : {
            validator : isVnuEmail,
            msg : props => `${props.value} không phải là một email hợp lệ` 
        }
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    avatarUrl :{
        type : String
    },
    officerCode : {
        type : String,
        unique : true
    },
    officerType : {
        type : String,
        default : "Giảng viên"
    },
    degree : {
        type : String,
        enum : ['CN','ThS','TS','PGS.TS','GS.TS','GS']
    },
    department : {
        type : Schema.Types.ObjectId,
        ref : 'Department'
    },
    researchFields : {
        type : [Schema.Types.ObjectId],
        ref : 'ResearchField',
        default : []
    },
    interestedFields : {
        type : [Schema.Types.ObjectId],
        ref : 'ResearchField',
        default : []
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
    },
    created : {
        type : Date,
        default : Date.now
    },
    updated : {
        type : Date,
        default : Date.now
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    id : false
})

UserSchema.index({
    firstName : 1,
    lastName : 1 
})

UserSchema.methods.comparePassword = function (password){
    console.log(password, this.password)
    return bcrypt.compareSync(password, this.password)
}

UserSchema.pre('save', function (next) {
    const rawPassword = this.password
    console.log(rawPassword)
    this.password = bcrypt.hashSync(rawPassword, 10)
    return next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User