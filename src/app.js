const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const getConfig = require('./config/env')
const cors = require('cors')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

setTimeout( async () => {
    
    app.use(require('./app.routes'))
    
    require('./connections/mongodb')

    const server = require('http').createServer(app)
    const port = getConfig('port')
    server.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })

}, 0)