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
const M508Controller =  require('../Controllers/M508/M508Controller')

router.get('/', M508Controller.getIndex)
router.post('/getCalculatedFile', upload.single("file"), M508Controller.getCalculatedData)


// Exporting Router Object to server
module.exports = router
