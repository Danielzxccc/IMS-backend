const express = require('express')
const router = express.Router()
const paidOrdersController = require('../controllers/paidOrdersController')

router.get('/get', paidOrdersController.getPaidOrders)
router.get('/reportData', paidOrdersController.getReportChartData)
router.post('/create', paidOrdersController.createPaidOrders)

module.exports = router
