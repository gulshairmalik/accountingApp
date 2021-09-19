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
const CostaaaController =  require('../Controllers/Costaaa/CostaaaController')

router.get('/', CostaaaController.getIndex)

router.post('/getCalculatedFile', upload.single("file"), CostaaaController.getCalculatedData)


// Exporting Router Object to server
module.exports = router
