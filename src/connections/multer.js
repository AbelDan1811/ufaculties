const multer = require('multer')
const getEnv = require('../config/env')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, getEnv('uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
  
const upload = multer({ storage: storage })
module.exports = upload