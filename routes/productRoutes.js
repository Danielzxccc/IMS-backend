const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productsController')

router.get('/get', productsController.getProducts)
router.get('/get/:id', productsController.getOneProduct)
router.get('/archive', productsController.getArchives)
router.post('/create', productsController.createProduct)
router.put('/update/:id', productsController.updateProduct)
router.put('/unarchive/:id', productsController.unarchiveProduct)
router.put('/multiplearchive', productsController.multiplearchive)
router.delete('/delete/:id', productsController.deleteProduct)
router.get('/reports', productsController.productReports)

module.exports = router
