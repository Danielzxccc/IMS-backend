const express = require('express')
const router = express.Router()
const paidOrdersController = require('../controllers/paidOrdersController')

router.get('/get', paidOrdersController.getPaidOrders)
router.get('/get/:id', paidOrdersController.getOnePaidOrder)
router.get('/reportData', paidOrdersController.getReportChartData)
router.get('/bestselling', paidOrdersController.getBestSellingProduct)
router.post('/create', paidOrdersController.createPaidOrders)

module.exports = router
