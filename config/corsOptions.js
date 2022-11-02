const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://ims-frontend-extn.vercel.app',
]
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by Cors'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
}
// || !origin
module.exports = corsOptions
