const Blog = require('../model/blog')

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'published' })
      .sort({ createdAt: -1 })
      .populate('author')
      .lean()
    return res.status(200).json({
      success: true,
      message: 'Get All Blogs Successfully',
      count: blogs.length,
      data: blogs,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch blogs',
      data: null,
    })
  }
}

exports.getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id
    const blog = await Blog.findById(blogId)

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
        data: null,
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Get Blog By Id Successfully',
      data: blog,
    })
  } catch (error) {
    console.error('Get blog by ID error:', error)
    return res.status(400).json({
      success: false,
      message: 'Invalid blog ID',
      data: null,
    })
  }
}

exports.addBlog = async (req, res) => {
  try {
    const { title, tags, image, description, category, publishAt } = req.body
    const userId = req.user.id

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required',
        data: null,
      })
    }

    const newBlog = await Blog.create({
      title,
      tags,
      image,
      description,
      category,
      author: userId,
      status: publishAt ? 'scheduled' : 'published',
      publishAt: publishAt || null,
      publishedAt: publishAt ? null : new Date(),
    })

    const io = req.app.get('io')

    if (newBlog.status === 'published') {
      io.emit('blog_added', newBlog)
    }

    return res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: newBlog,
    })
  } catch (error) {
    console.error('Add blog error:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to create blog',
    })
  }
}

exports.updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, {
      new: true,
      runValidators: true,
    })

    if (!updatedBlog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      })
    }

    const io = req.app.get('io')
    io.emit('blog_updated', updatedBlog)

    return res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      data: updatedBlog,
    })
  } catch (error) {
    console.error('Update blog error:', error)
    return res.status(400).json({
      success: false,
      message: 'Failed to update blog',
      data: null,
    })
  }
}

exports.deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id
    const deletedBlog = await Blog.findByIdAndDelete(blogId)

    if (!deletedBlog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
        data: null,
      })
    }
    const io = req.app.get('io')
    io.emit('blog_deleted', deletedBlog)

    return res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
    })
  } catch (error) {
    console.error('Delete blog error:', error)
    return res.status(400).json({
      success: false,
      message: 'Failed to delete blog',
      data: null,
    })
  }
}
