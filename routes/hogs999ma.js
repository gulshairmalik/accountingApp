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
const Hogs999MaController =  require('../Controllers/Hogs999MA/Hogs999MaController')

router.get('/', Hogs999MaController.getIndex)
router.post('/getCalculatedFile', upload.single("file"), Hogs999MaController.getCalculatedData)


// Exporting Router Object to server
module.exports = router
