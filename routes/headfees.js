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
const HeadfeesController =  require('../Controllers/Headfees/HeadfeesController')

router.get('/', HeadfeesController.getIndex)
router.post('/getCalculatedFile', upload.single("file"), HeadfeesController.getHeadFeesCalculated)


// Exporting Router Object to server
module.exports = router
