const client = require('../config/dbConfig')

const getPaidOrders = async (req, res) => {
  try {
    const data = await client.select().from('paidorders')
    res.json(data)
  } catch (error) {
    res.json({ error: true, message: error.stack })
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
    res.json({ message: 'Added Successfully' })
  } catch (error) {
    res.status(400).json({ error: true, message: error })
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
    const calculateSales = data.map((item) => {
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
      return
    })
    res.json([dataChart])
  } catch (error) {
    res.status(400).json({ error: true, message: error })
  }
}

module.exports = { getPaidOrders, getReportChartData, createPaidOrders }
