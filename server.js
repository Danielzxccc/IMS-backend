require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3500
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')

//middlewares
app.use(express.json(corsOptions))
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

//session config
app.use(
  session({
    key: 'userId',
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 1000 * 24 * 60,
    },
  })
)
// routes
app.use('/profiles', require('./routes/profileRoutes'))
app.use('/users', require('./routes/usersRoutes'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/products', require('./routes/productRoutes'))
app.use('/paidorders', require('./routes/paidOrdersRoutes'))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
