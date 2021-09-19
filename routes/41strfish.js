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
const StrfishController41 =  require('../Controllers/41Strfish/41StrfishController')

router.get('/', StrfishController41.getIndex)
router.post('/getCalculatedFile', upload.single("file"), StrfishController41.getCalculatedData)


// Exporting Router Object to server
module.exports = router
