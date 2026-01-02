const mongoose = require('mongoose')

const MONGO_DB_URL =
  process.env.MONGO_DB_URL || 'mongodb://localhost:27017/Blog_Platform'
const ConnectDB = async () => {
  try {
    const DB = await mongoose.connect(MONGO_DB_URL)
    console.log(`MongoDB connected: ${DB.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    // process.exit(1); // Exit process with failure
  }
}

module.exports = ConnectDB
