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
const HogsController =  require('../Controllers/Hogs99/HogsController')
router.get('/', HogsController.getIndex)
router.post('/getCalculatedFile', upload.single("file"), HogsController.getCalculatedData)


// Exporting Router Object to server
module.exports = router
