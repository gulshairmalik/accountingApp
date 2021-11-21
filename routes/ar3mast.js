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
const AR3MastController =  require('../Controllers/AR3Mast/AR3MastController')

router.get('/', AR3MastController.getIndex)
router.post('/getCalculatedFile', upload.single("file"), AR3MastController.getCalculatedData)


// Exporting Router Object to server
module.exports = router
