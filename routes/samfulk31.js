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
const Samfulk31Controller =  require('../Controllers/Samfulk31/Samfulk31Controller')

router.get('/', Samfulk31Controller.getIndex)
router.post('/getCalculatedFile', upload.single("file"), Samfulk31Controller.getCalculatedData)


// Exporting Router Object to server
module.exports = router
