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
const MastKala1Controller =  require('../Controllers/Mastkala1/MastKala1Controller')

router.get('/', MastKala1Controller.getIndex)
router.post('/getCalculatedFile', upload.single("file"), MastKala1Controller.getCalculatedData)


// Exporting Router Object to server
module.exports = router
