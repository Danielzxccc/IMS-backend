const client = require('../config/dbConfig')

const getProducts = async (req, res) => {
  try {
    const data = await client.select().from('products')
    res.json(data)
  } catch (error) {
    res.json({ error: true, message: error })
  }
}
const createProduct = async (req, res) => {
  try {
    const data = req.body
    const insert = await client.insert(data).into('products').returning('*')
    res.json(insert)
  } catch (error) {
    res.json({ error: true, message: error.stack })
  }
}

module.exports = { getProducts, createProduct }
