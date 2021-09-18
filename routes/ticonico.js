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
const TiconicoController =  require('../Controllers/Ticonico/TiconicoController')

// Get Request to '/riverrat
router.get('/', TiconicoController.getIndex)

// POST Request to '/riverrat/getCalculatedFile'
router.post('/getCalculatedFile', upload.single("file"), TiconicoController.getCalculatedData)


// Exporting Router Object to server
module.exports = router
