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
const HtownrcController =  require('../Controllers/Htownrc/HtownrcController')

router.get('/', HtownrcController.getIndex)
router.post('/getCalculatedFile', upload.single("file"), HtownrcController.getCalculatedData)


// Exporting Router Object to server
module.exports = router
