const express = require('express')
const router = express.Router()

// Get Request to '/'
router.get('/', (req, res) => res.render("index"))

// Exporting Router Object to server
module.exports = router
