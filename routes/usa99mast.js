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
const USA99MastController =  require('../Controllers/USA99MAST/USA99MastController')

router.get('/', USA99MastController.getIndex)
router.post('/getCalculatedFile', upload.single("file"), USA99MastController.getCalculatedData)


// Exporting Router Object to server
module.exports = router
