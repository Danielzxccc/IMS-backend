const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.get('/get', usersController.getUsers)
router.get('/get/:id', usersController.getOneUser)
router.post('/create', usersController.createUser)
router.get('/archives', usersController.getArchives)
router.put('/archiveuser/:id', usersController.archiveUser)
router.put('/unarchive/:id', usersController.unarchive)
router.put('/multiplearchive', usersController.multiplearchive)
router.put('/updateuser/:id', usersController.updateUser)

module.exports = router
