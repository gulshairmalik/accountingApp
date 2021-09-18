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
const Jackhigh1Controller =  require('../Controllers/Jackhigh1/Jackhigh1Controller')

// Get Request to '/riverrat
router.get('/', Jackhigh1Controller.getIndex)

// POST Request to '/riverrat/getCalculatedFile'
router.post('/getCalculatedFile', upload.single("file"), Jackhigh1Controller.getCalculatedData)


// Exporting Router Object to server
module.exports = router
