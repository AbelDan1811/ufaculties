const getConfig = require('../config/env')
const mongoose = require('mongoose')

const dbUrl = getConfig('mongodb') 
mongoose.connect(dbUrl, {
    useNewUrlParser : true,
    useCreateIndex : true
}).then(() => {
    console.log('Connected to Database!')
}).catch( err => {
    console.log('Failed connecting to Database !')
})
mongoose.set('debug', true)
