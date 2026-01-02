const express = require('express')
const BlogController = require('../controller/blog.controller')
const { isAuthenticated } = require('../middleware/isAuthenticated')

const router = express.Router()

router.get('/', BlogController.getAllBlogs)
router.get('/:id', BlogController.getBlogById)

router.post('/', isAuthenticated, BlogController.addBlog)

router.put('/update/:id', BlogController.updateBlog)

router.delete('/delete/:id', BlogController.deleteBlog)

module.exports = router
