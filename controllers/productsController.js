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

// include all column
const productReports = async (req, res) => {
  try {
    const query = await client.raw(
      'SELECT products.id, products.pname, products.pcategory, products.price, products.pcolor, products.psize, products.stocks, products.pdescript, products.pimageurl, SUM(paidorders.quantity) as qtysold, SUM(paidorders.tprice) as productsales, COUNT(paidorders.id) as orders FROM products LEFT JOIN paidorders ON paidorders.product_id = products.id WHERE products.active = 1 GROUP BY products.id ORDER BY products.id DESC '
    )
    res.status(200).send(query.rows)
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: true, message: error })
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
  productReports,
}
