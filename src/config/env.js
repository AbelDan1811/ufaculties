const path = require('path')

const config = {
    port : process.env.PORT || 3000,
    mongodb : process.env.MONGODB || 'mongodb://localhost:27017/ufaculties',
    secretKey : process.env.SECRET_KEY || 'rosesarered',
    uploads : process.env.SECRET_KEY || path.join(__basedir,'uploads')
}

module.exports = (key, defaultValue = null) => {
    return config[key] || defaultValue
}