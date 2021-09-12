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
var SethPlayerController =  require('../Controllers/SethPlayer/SethPlayerController')

// Get Request to '/sethplayer
router.get('/', SethPlayerController.getIndex)

// POST Request to '/sethplayer/getCalculatedFile'
router.post('/getCalculatedFile', upload.single("file"), SethPlayerController.getCalculatedData)


// Exporting Router Object to server
module.exports = router
