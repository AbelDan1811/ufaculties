const readXlsxFile = require('read-excel-file/node')
const fs = require('fs')

const UserImportSchema = {
    'USERNAME': {
        prop: 'username',
        type: String,
        required : true
    },
    'PASSWORD': {
        prop: 'password',
        type: String,
        required: true
    },
    'FULLNAME' : {
        prop :'fullName',
        type : String,
        required : true
    },
    'EMAIL' : {
        prop : 'email',
        type : String,
        required : true
    },
    'OFFICER CODE' : {
        prop : 'officerCode',
        type : String,
    },
    'PHONE NUMBER' : {
        prop : 'phoneNumber',
        type : String
    },
    'DEGREE' : {
        prop : 'degree',
        type : String
    }
}

module.exports = async (file) => {
    console.log(file)
    const { originalname , buffer, path} = file
    const words = originalname.split('.')
    const extension = words[ words.length - 1 ]
    if (extension !== 'xlsx' && extension !== 'xls') 
        throw new Error("Định dạng file không hỗ trợ")

    const {rows} = await readXlsxFile( path, { schema : UserImportSchema })
    return rows
}