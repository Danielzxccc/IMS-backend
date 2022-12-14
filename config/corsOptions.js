const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://ims-frontend-extn.vercel.app',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
]
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by Cors'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
}

module.exports = corsOptions
