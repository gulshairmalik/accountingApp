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
const DsoController =  require('../Controllers/Dso/DsoController')

router.get('/', DsoController.getIndex)
router.post('/getCalculatedFile', upload.single("file"), DsoController.getCalculatedData)


// Exporting Router Object to server
module.exports = router
