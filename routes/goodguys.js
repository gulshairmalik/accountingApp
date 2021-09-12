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
var GoodGuysController =  require('../Controllers/GoodGuys/GoodGuysController')

// Get Request to '/hogs99
router.get('/', GoodGuysController.getIndex)

// POST Request to '/hogs99/getCalculatedFile'
router.post('/getCalculatedFile', upload.single("file"), GoodGuysController.getCalculatedData)


// Exporting Router Object to server
module.exports = router
