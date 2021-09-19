const express = require('express')
const router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    cb(null , file.originalname)
  }
})

const upload = multer({ storage: storage })

// Controllers
const StrfishController31 =  require('../Controllers/31Strfish/31StrfishController')

router.get('/', StrfishController31.getIndex)
router.post('/getCalculatedFile', upload.single("file"), StrfishController31.getCalculatedData)


// Exporting Router Object to server
module.exports = router
