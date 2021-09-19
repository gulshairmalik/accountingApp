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
const StrfishController61 =  require('../Controllers/61Strfish/61StrfishController')

router.get('/', StrfishController61.getIndex)
router.post('/getCalculatedFile', upload.single("file"), StrfishController61.getCalculatedData)


// Exporting Router Object to server
module.exports = router
