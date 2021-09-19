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
const StrfishController51 =  require('../Controllers/51Strfish/51StrfishController')

router.get('/', StrfishController51.getIndex)
router.post('/getCalculatedFile', upload.single("file"), StrfishController51.getCalculatedData)


// Exporting Router Object to server
module.exports = router
