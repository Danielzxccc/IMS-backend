const client = require('../config/dbConfig')
const {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfYear,
  endOfYear,
  getDate,
} = require('date-fns')

const getPaidOrders = async (req, res) => {
  try {
    let dateRange = []
    const { range } = req.body
    const today = new Date()
    //start range
    const startDefault = new Date('2015-1-1')
    const endDefault = new Date('2025-12-25')
    //monthly range
    const startMonth = startOfMonth(new Date())
    const endMonth = endOfMonth(new Date())
    //weekly range
    const startWeek = startOfWeek(new Date())
    const endWeek = endOfWeek(new Date())
    //yearly
    const startYear = startOfYear(new Date())
    const endYear = endOfYear(new Date())

    switch (range) {
      case 'DEFAULT':
        dateRange.push(startDefault, endDefault)
        break
      case 'DAILY':
        dateRange.push(today, today)
        break
      case 'WEEKLY':
        dateRange.push(startWeek, endWeek)
        break
      case 'MONTHLY':
        dateRange.push(startMonth, endMonth)
        break
      case 'ANNUAL':
        dateRange.push(startYear, endYear)
        break
      default:
        break
    }

    const data = await client
      .select(
        'paidorders.id',
        'paidorders.cname',
        'paidorders.product_id',
        'paidorders.st_name',
        'paidorders.dmethod',
        'paidorders.pmethod',
        'paidorders.tprice',
        'paidorders.quantity',
        'paidorders.street',
        'paidorders.barangay',
        'paidorders.city',
        'paidorders.region',
        'paidorders.country',
        'paidorders.postal',
        'paidorders.contact',
        'paidorders.active',
        'paidorders.date_added',
        'products.pname',
        'products.pcategory',
        'products.price',
        'products.pcolor',
        'products.psize',
        'products.pimageurl',
        'products.pimagename'
      )
      .from('paidorders')
      .whereBetween('date_added', dateRange)
      .join('products', { 'paidorders.product_id': 'products.id' })
      .orderByRaw('paidorders.date_added DESC')
    res.status(200).json(data)
  } catch (error) {
    res.json({ error: true, message: error.stack })
  }
}

const getOnePaidOrder = async (req, res) => {
  try {
    const id = req.params.id
    const data = await client
      .select('*')
      .from('paidorders')
      .join('products', { 'products.id': 'paidorders.product_id' })
      .where('paidorders.id', id)
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({ error: true, message: error.stack })
  }
}

const createPaidOrders = async (req, res) => {
  try {
    const data = req.body
    //insert the data
    const insert = await client.insert(data).into('paidorders').returning('*')
    //update the stocks
    const productToUpdate = await client('products').where(
      'id',
      insert[0].product_id
    )
    const updateStocks = await client('products')
      .where('id', insert[0].product_id)
      .update({
        stocks: productToUpdate[0].stocks - insert[0].quantity,
      })
    res.status(201).json({ message: 'Added Successfully' })
  } catch (error) {
    res.status(400).json({ error: true, message: error.stack })
  }
}

const getReportChartData = async (req, res) => {
  try {
    const data = await client.select().from('paidorders')
    const dataChart = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    }
    data.forEach((item) => {
      const date = new Date(item.date_added)
      const month = date.getMonth()
      switch (month) {
        case 0:
          dataChart.January = dataChart.January + parseInt(item.quantity)
          break
        case 1:
          dataChart.February = dataChart.February + parseInt(item.quantity)
          break
        case 2:
          dataChart.March = dataChart.March + parseInt(item.quantity)
          break
        case 3:
          dataChart.April = dataChart.April + parseInt(item.quantity)
          break
        case 4:
          dataChart.May = dataChart.May + parseInt(item.quantity)
          break
        case 5:
          dataChart.June = dataChart.June + parseInt(item.quantity)
          break
        case 6:
          dataChart.July = dataChart.July + parseInt(item.quantity)
          break
        case 7:
          dataChart.August = dataChart.August + parseInt(item.quantity)
          break
        case 8:
          dataChart.September = dataChart.September + parseInt(item.quantity)
          break
        case 9:
          dataChart.October = dataChart.October + parseInt(item.quantity)
          break
        case 10:
          dataChart.November = dataChart.November + parseInt(item.quantity)
          break
        case 11:
          dataChart.December = dataChart.December + parseInt(item.quantity)
          break
        default:
          break
      }
    })
    res.status(200).json([dataChart])
  } catch (error) {
    res.status(400).json({ error: true, message: error })
  }
}

const getBestSellingProduct = async (req, res) => {
  try {
    const data = await client
      .select('pimageurl')
      .from('products')
      .whereRaw(
        'id = (SELECT product_id from paidorders GROUP BY product_id ORDER BY COUNT(quantity) DESC LIMIT 1)'
      )
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({ error: true, message: error.stack })
  }
}

const getReports = async (req, res) => {
  try {
    const today = new Date()
    //monthly range
    const startMonth = startOfMonth(new Date())
    const endMonth = endOfMonth(new Date())
    //weekly range
    const startWeek = startOfWeek(new Date())
    const endWeek = endOfWeek(new Date())
    //yearly
    const startYear = startOfYear(new Date())
    const endYear = endOfYear(new Date())

    const data = await client.raw(
      'SELECT (SELECT SUM(tprice) from paidorders WHERE date_added BETWEEN ? and ?) as daily, (SELECT SUM(tprice) from paidorders WHERE date_added BETWEEN ? and ?) as monthly, (SELECT SUM(tprice) from paidorders WHERE date_added BETWEEN ? and ?) as yearly, (SELECT SUM(tprice) from paidorders WHERE date_added BETWEEN ? and ?) as weekly FROM paidorders LIMIT 1;',
      [
        today,
        today,
        startMonth,
        endMonth,
        startYear,
        endYear,
        startWeek,
        endWeek,
      ]
    )

    res.status(200).json(data.rows)
  } catch (error) {
    res.status(400).json({ error: true, message: error.stack })
  }
}

const checkLowStocks = async (req, res) => {
  try {
    const data = await client
      .select('*')
      .from('products')
      .whereRaw('stocks <= 10 AND active = 1')
      .orderByRaw('stocks ASC')
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({ error: true, message: error.stack })
  }
}

module.exports = {
  getPaidOrders,
  getOnePaidOrder,
  getReportChartData,
  createPaidOrders,
  getBestSellingProduct,
  getReports,
  checkLowStocks,
}
