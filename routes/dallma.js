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
const DallMaController =  require('../Controllers/DallMa/DallMaController')

router.get('/', DallMaController.getIndex)
router.post('/getCalculatedFile', upload.single("file"), DallMaController.getCalculatedData)


// Exporting Router Object to server
module.exports = router
