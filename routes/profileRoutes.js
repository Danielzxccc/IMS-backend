const express = require('express')
const router = express.Router()
const profileControllers = require('../controllers/profileController')


router.get('/get', profileControllers.getProfiles)
router.post('/create', profileControllers.createProfile)


module.exports = router