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
const Bigkala1Controller =  require('../Controllers/Bigkala1/Bigkala1Controller.js')

router.get('/', Bigkala1Controller.getIndex)
router.post('/getCalculatedFile', upload.single("file"), Bigkala1Controller.getCalculatedData)


// Exporting Router Object to server
module.exports = router
