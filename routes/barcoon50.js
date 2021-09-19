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
const Barcoon50Controller =  require('../Controllers/Barcoon50/Barcoon50Controller')

router.get('/', Barcoon50Controller.getIndex)
router.post('/getCalculatedFile', upload.single("file"), Barcoon50Controller.getCalculatedData)


// Exporting Router Object to server
module.exports = router
