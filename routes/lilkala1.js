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
const Lilkala1Controller =  require('../Controllers/Lilkala1/Lilkala1Controller.js')

router.get('/', Lilkala1Controller.getIndex)
router.post('/getCalculatedFile', upload.single("file"), Lilkala1Controller.getCalculatedData)


// Exporting Router Object to server
module.exports = router
