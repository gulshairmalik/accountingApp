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
const ARK4MastController =  require('../Controllers/ARK4Mast/ARK4MastController')

router.get('/', ARK4MastController.getIndex)
router.post('/getCalculatedFile', upload.single("file"), ARK4MastController.getCalculatedData)


// Exporting Router Object to server
module.exports = router
