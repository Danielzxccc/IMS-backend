const client = require('../config/dbConfig')

const getProfiles = async (req, res) => {
  try {
    const data = await client.select().from('profiles')
    res.json(data)
  } catch (error) {
    res.json({ error: true, message: error })
  }
}
const createProfile = async (req, res) => {
  try {
    const data = req.body
    const insert = await client.insert(data).into('profiles').returning('*')
    res.json(insert)
  } catch (error) {
    res.json({ error: true, message: error })
  }
}
module.exports = { getProfiles, createProfile }
