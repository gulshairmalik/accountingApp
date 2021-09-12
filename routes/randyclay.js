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
const RandyClayController =  require('../Controllers/RandyClay/RandyClayController')

router.get('/', RandyClayController.getIndex)
router.post('/getCalculatedFile', upload.single("file"), RandyClayController.getCalculatedData)


// Exporting Router Object to server
module.exports = router
