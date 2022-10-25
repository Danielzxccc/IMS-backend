const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productsController')

router.get('/get', productsController.getProducts)
router.post('/create', productsController.createProduct)

module.exports = router
