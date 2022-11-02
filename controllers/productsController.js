const client = require('../config/dbConfig')

const getProducts = async (req, res) => {
  try {
    const data = await client.select().from('products').orderBy('id', 'desc')
    res.json(data)
  } catch (error) {
    res.json({ error: true, message: error.stack })
  }
}
const getOneProduct = async (req, res) => {
  try {
    const id = req.params.id
    const data = await client('products').where({ id: id })
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
const updateProduct = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body
    const query = await client('products').where({ id: id }).update(data)
    if (query) {
      res.json({ message: 'updated successfully' })
    } else {
      res.json({ message: 'error' })
    }
  } catch (error) {
    res.json({ error: true, message: error.stack })
  }
}
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id
    const query = await client('products').where('id', id).del()
    if (query) {
      res.json({ message: 'deleted successfully' })
    } else {
      res.json({ message: 'error' })
    }
  } catch (error) {
    res.json({ error: true, message: error.stack })
  }
}
module.exports = {
  getProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}
