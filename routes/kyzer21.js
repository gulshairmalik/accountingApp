const express = require('express')
const router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + './../uploads')
  },
  filename: (req, file, cb) => {
    cb(null , file.originalname)
  }
})

const upload = multer({ storage: storage })

// Controllers
const Kyzer21Controller =  require('../Controllers/Kyzer21/Kyzer21Controller')

router.get('/', Kyzer21Controller.getIndex)
router.post('/getCalculatedFile', upload.single("file"), Kyzer21Controller.getCalculatedData)


// Exporting Router Object to server
module.exports = router
