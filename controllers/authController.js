const client = require('../config/dbConfig')
const bcrypt = require('bcrypt')

const authLogin = async (req, res) => {
  const loginDetails = req.body
  try {
    const results = await client('users')
      .where({ username: loginDetails.username })
      .first()
    if (!results) {
      res.status(400).json({
        message: 'No username by that name',
      })
    } else {
      const compare = await bcrypt.compare(
        loginDetails.password,
        results.password
      )
      if (!compare) {
        res.status(401).json({
          error: 'Unauthorized Access!',
          message: 'Failed',
        })
      } else {
        req.session.user = results
        res.status(200).json({
          message: 'Success',
          user: req.session.user,
        })
      }
    }
  } catch (error) {
    console.log(error.stack)
    res.status(400).json({ error: true, message: error })
  }
}

const refreshToken = (req, res) => {
  if (req.session.user) {
    res.json({ token: true, user: req.session.user })
  } else {
    res.json({ token: false })
  }
}

const logout = (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).json({ message: 'unable to logout' })
      } else {
        res.status(200).json({ message: 'logout successfully' })
      }
    })
  }
}
module.exports = { authLogin, refreshToken, logout }
