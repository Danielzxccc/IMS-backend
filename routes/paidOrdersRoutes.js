const express = require('express')
const router = express.Router()
const paidOrdersController = require('../controllers/paidOrdersController')

router.post('/get', paidOrdersController.getPaidOrders)
router.get('/get/:id', paidOrdersController.getOnePaidOrder)
router.get('/reportData', paidOrdersController.getReportChartData)
router.get('/bestselling', paidOrdersController.getBestSellingProduct)
router.get('/reports', paidOrdersController.getReports)
router.post('/create', paidOrdersController.createPaidOrders)
router.get('/lowstocks', paidOrdersController.checkLowStocks)

module.exports = router
