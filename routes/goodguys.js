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
const GoodGuysController =  require('../Controllers/GoodGuys/GoodGuysController')

router.get('/', GoodGuysController.getIndex)
router.post('/getCalculatedFile', upload.single("file"), GoodGuysController.getCalculatedData)


// Exporting Router Object to server
module.exports = router
