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
const Sc222Controller =  require('../Controllers/Sc222/Sc222Controller')

router.get('/', Sc222Controller.getIndex)
router.post('/getCalculatedFile', upload.single("file"), Sc222Controller.getCalculatedData)


// Exporting Router Object to server
module.exports = router
