const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productsController')

router.get('/get', productsController.getProducts)
router.get('/get/:id', productsController.getOneProduct)
router.post('/create', productsController.createProduct)
router.put('/update/:id', productsController.updateProduct)
router.delete('/delete/:id', productsController.deleteProduct)

module.exports = router
