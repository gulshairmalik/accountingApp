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
const AR1Controller =  require('../Controllers/AR1/AR1Controller')

router.get('/', AR1Controller.getIndex)
router.post('/getCalculatedFile', upload.single("file"), AR1Controller.getCalculatedData)


// Exporting Router Object to server
module.exports = router
