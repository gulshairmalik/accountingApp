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
var AustinController =  require('../Controllers/Austin2/AustinController')

// Get Request to '/hogs99
router.get('/', AustinController.getIndex)

// POST Request to '/hogs99/getCalculatedFile'
router.post('/getCalculatedFile', upload.single("file"), AustinController.getCalculatedData)


// Exporting Router Object to server
module.exports = router
