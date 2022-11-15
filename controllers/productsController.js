const client = require('../config/dbConfig')

const getProducts = async (req, res) => {
  try {
    const data = await client
      .select()
      .from('products')
      .where('active', 1)
      .orderBy('id', 'desc')
    res.json(data)
  } catch (error) {
    res.status(400).json({ error: true, message: error.stack })
  }
}
const getOneProduct = async (req, res) => {
  try {
    const id = req.params.id
    const data = await client('products').where({ id: id })
    res.json(data)
  } catch (error) {
    res.status(400).json({ error: true, message: error })
  }
}

const getArchives = async (req, res) => {
  try {
    const data = await client
      .select()
      .from('products')
      .where('active', 0)
      .orderBy('id', 'desc')
    res.json(data)
  } catch (error) {
    res.status(400).json({ error: true, message: error })
  }
}
const createProduct = async (req, res) => {
  try {
    const data = req.body
    const insert = await client.insert(data).into('products').returning('*')
    res.json(insert)
  } catch (error) {
    res.status(400).json({ error: true, message: error })
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
    res.status(400).json({ error: true, message: error })
  }
}
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id
    const query = await client('products').where('id', id).update({
      active: '0',
      date_archive: new Date(),
    })
    if (query) {
      res.json({ message: 'deleted successfully' })
    } else {
      res.json({ message: 'error' })
    }
  } catch (error) {
    res.status(400).json({ error: true, message: error.stack })
  }
}
const unarchiveProduct = async (req, res) => {
  try {
    const id = req.params.id
    const query = await client('products').where('id', id).update({
      active: '1',
      date_archive: null,
    })
    if (query) {
      res.json({ message: 'deleted successfully' })
    } else {
      res.json({ message: 'error' })
    }
  } catch (error) {
    res.status(400).json({ error: true, message: error })
  }
}

const multiplearchive = async (req, res) => {
  try {
    const { products } = req.body

    let queryString = 'id = '
    products.forEach((element, key, arr) => {
      if (Object.is(arr.length - 1, key)) {
        queryString += element
      } else {
        queryString += element + ' OR id = '
      }
    })

    const query = await client('products').whereRaw(queryString).update({
      active: '1',
      date_archive: null,
    })
    if (query) res.json({ message: 'unarchive successfully' })
  } catch (error) {
    res.status(400).json({ error: true, message: error })
    console.log(error.stack)
  }
}

module.exports = {
  getProducts,
  getOneProduct,
  getArchives,
  createProduct,
  updateProduct,
  deleteProduct,
  unarchiveProduct,
  multiplearchive,
}
