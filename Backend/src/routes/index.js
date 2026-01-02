const express = require('express')
const router = express.Router()

const blogRoutes = require('./blog.routes')
const authRoutes = require('./auth.routes')

router.use('/auth', authRoutes)
router.use('/blogs', blogRoutes)

module.exports = router
