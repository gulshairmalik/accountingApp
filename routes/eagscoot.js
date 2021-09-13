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
const EagscootController =  require('../Controllers/Eagscoot/EagscootController')

router.get('/', EagscootController.getIndex)
router.post('/getCalculatedFile', upload.fields([{name: 'file1', maxCount: 1}, {name: 'file2', maxCount: 1}, {name: 'file3', maxCount: 1}]), EagscootController.getCalculatedData)


// Exporting Router Object to server
module.exports = router
