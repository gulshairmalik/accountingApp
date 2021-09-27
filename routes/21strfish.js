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
const StrfishController21 =  require('../Controllers/21Strfish/21StrfishController')

router.get('/', StrfishController21.getIndex)
router.post('/getCalculatedFile', upload.single("file"), StrfishController21.getCalculatedData)


// Exporting Router Object to server
module.exports = router
