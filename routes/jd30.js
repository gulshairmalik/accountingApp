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
const Jd30Controller =  require('../Controllers/Jd30/Jd30Controller')

router.get('/', Jd30Controller.getIndex)
router.post('/getCalculatedFile', upload.single("file"), Jd30Controller.getCalculatedData)


// Exporting Router Object to server
module.exports = router
