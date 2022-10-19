const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.get('/get', usersController.getUsers)
router.get('/get/:id', usersController.getOneUser)
router.post('/create', usersController.createUser)

module.exports = router
