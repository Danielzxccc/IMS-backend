const client = require('../config/dbConfig')
const bcrypt = require('bcrypt')

const getUsers = async (req, res) => {
  try {
    const data = await client.select().from('users').where('active', 1)
    if (!data.length) {
      res.status(400).json({ message: 'No result found' })
    } else {
      res.status(200).json(data)
    }
  } catch (error) {
    res.status(400).json({ error: true, message: error })
  }
}

const createUser = async (req, res) => {
  try {
    const { name, username, password, contact, email, role, status } = req.body

    //check for duplicate
    const duplicate = await client
      .select()
      .from('users')
      .where('username', username)

    if (duplicate.length) {
      return res.status(409).json({ message: 'Duplicate username' })
    }
    //hash the password
    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject = {
      name: name,
      username: username,
      password: hashedPwd,
      contact: contact,
      email: email,
      role: role,
      status: status,
    }
    //insert the user object
    const insert = await client.insert(userObject).into('users').returning('*')

    res.status(201).json({
      message: `The user was successfully created. ID: ${insert[0].id}`,
      id: insert[0].id,
    })
  } catch (error) {
    res.status(400).json({ error: true, message: error.stack })
  }
}

const getOneUser = async (req, res) => {
  try {
    const id = req.params.id
    const data = await client.select().from('users').where('id', id)
    if (!data.length) {
      res.status(200).json({ message: 'No result found' })
    } else {
      res.status(200).json(data)
    }
  } catch (error) {
    res.json({ error: true, message: error })
  }
}

const getArchives = async (req, res) => {
  try {
    const data = await client
      .select()
      .from('users')
      .where('active', 0)
      .orderBy('id', 'desc')
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({ error: true, message: error })
  }
}

const archiveUser = async (req, res) => {
  try {
    const id = req.params.id
    const query = await client('users').where('id', id).update({
      active: '0',
      status: 'Inactive',
      date_archived: new Date(),
    })
    if (query) {
      res.status(201).json({ message: 'deleted successfully' })
    } else {
      res.status(400).json({ message: 'error' })
    }
  } catch (error) {
    res.status(400).json({ error: true, message: error.stack })
  }
}

const unarchive = async (req, res) => {
  try {
    const id = req.params.id
    const query = await client('users').where('id', id).update({
      active: '1',
      date_archived: null,
    })
    if (query) {
      res.status(201).json({ message: 'unarchived successfully' })
    } else {
      res.status(400).json({ message: 'error' })
    }
  } catch (error) {
    res.status(400).json({ error: true, message: error.stack })
  }
}

const multiplearchive = async (req, res) => {
  try {
    const { users } = req.body

    let queryString = 'id = '
    users.forEach((element, key, arr) => {
      if (Object.is(arr.length - 1, key)) {
        queryString += element
      } else {
        queryString += element + ' OR id = '
      }
    })

    const query = await client('users').whereRaw(queryString).update({
      active: '1',
      status: 'Active',
      date_archived: null,
    })
    if (query) res.json({ message: 'unarchive successfully' })
  } catch (error) {
    res.status(400).json({ error: true, message: error })
    console.log(error.stack)
  }
}

const updateUser = async (req, res) => {
  try {
    const id = req.params.id
    const { name, username, password, contact, email, role, status } = req.body

    const hashedPwd = await bcrypt.hash(password, 10)

    const userObject = {
      name: name,
      username: username,
      password: hashedPwd,
      contact: contact,
      email: email,
      role: role,
      status: status,
    }
    if (password === '') delete userObject.password

    const query = await client('users').where({ id: id }).update(userObject)
    res.status(200).json({ message: 'Updated Successfully' })
  } catch (error) {
    res.status(400).json({ error: true, message: error })
    console.log(error)
  }
}
module.exports = {
  getUsers,
  createUser,
  getOneUser,
  getArchives,
  archiveUser,
  unarchive,
  multiplearchive,
  updateUser,
}
