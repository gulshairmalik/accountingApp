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
const VangavController =  require('../Controllers/Vangav/VangavController')

router.get('/', VangavController.getIndex)
router.post('/getCalculatedFile', upload.single("file"), VangavController.getCalculatedData)


// Exporting Router Object to server
module.exports = router
