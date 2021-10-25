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
const Blaker77Controller =  require('../Controllers/Blaker77/Blaker77Controller')

router.get('/', Blaker77Controller.getIndex)
router.post('/getCalculatedFile', upload.single("file"), Blaker77Controller.getCalculatedData)


// Exporting Router Object to server
module.exports = router
