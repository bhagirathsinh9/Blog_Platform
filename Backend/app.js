const express = require('express')
const cors = require('cors')
const allRoutes = require('./src/routes/index')
const ConnectDB = require('./src/config/database')

const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: '*',
  }),
)

ConnectDB()

//Routes
app.use('/api', allRoutes)

module.exports = { app }
