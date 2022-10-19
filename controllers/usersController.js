const client = require('../config/dbConfig')
const bcrypt = require('bcrypt')

const getUsers = async (req, res) => {
  try {
    const data = await client.select().from('users')
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
    res.json({ error: true, message: error })
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
module.exports = { getUsers, createUser, getOneUser }
