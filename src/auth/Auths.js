const authHelper = require('./helper')

exports.isAuthenticated = () => async (req, res, next) => {
    const token = authHelper.getAccessToken(req)
    
    try{
        const payload = await authHelper.decodeToken(token)
        console.log(payload)
        const {userId, role} = payload
        req['userId'] = userId
        req['userRole'] = role 
    }
    catch (err) {
        return res.status(403).send({
            success : false,
            message : err.message || ''
        })
    }
        
    return next() 
}

exports.hasPermissionOnUserProfile = () => async (req, res, next) => {
    const { userRole, userId } = req
    const { userId : ownerId } = req.params

    if (userRole !== 'admin' && ownerId != userId ){
        return res.status(403).send({
            success : false,
            message : "User doesn't have permission to operate" || ''
        })
    }
    
    return next()  
}

exports.hasRole = (role) => async (req, res, next) => {
    const { userRole } = req

    if (userRole !== role){
        return res.status(403).send({
            success : false,
            message : "User doesn't have permission to operate" || ''
        })
    }
    
    return next()
}


