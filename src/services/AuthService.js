const User = require('../schemas/User')
const authHelper = require('../auth/helper')
const validateName = require('../helper/validateName')

exports.signIn = async ({username , password}) => {
    const user = await User
        .findOne({
            username : username 
        })
        .select('username role password')
    
    if (!user || !user.comparePassword(password))
        throw new Error(`Username or password is invalid!`)
        
    user.password = undefined
    
    const token = await authHelper.encodeToken({
        userId : user._id,
        role : user.role
    })
    
    return {
        user,
        token
    }
}

exports.registerAsAdmin = async (payload) => {
    const {fullName} = payload 
    if (!fullName) 
        throw new Error('Missng fullName!')

    const splitedName = await validateName(fullName)
    const validatedPayload = Object.assign({}, payload, splitedName)
    
    const newUser = new User(validatedPayload)
    newUser.role = 'admin'
    newUser.officerType  = 'Nhân viên'
    
    const savedUser = await newUser.save()

    savedUser.password = undefined

    const token = await authHelper.encodeToken({
        userId : savedUser._id,
        role : savedUser.role
    })

    return {
        user : savedUser,
        token
    }
}

