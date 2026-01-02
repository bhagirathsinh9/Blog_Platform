const cron = require('node-cron')
const Blog = require('../model/blog')

module.exports = (io) => {
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date()

      const blogs = await Blog.find({
        status: 'scheduled',
        publishAt: { $lte: now },
      })

      for (const blog of blogs) {
        blog.status = 'published'
        blog.publishedAt = new Date()
        await blog.save()

        io.emit('blog_added', blog)
      }
    } catch (error) {
      console.error('Cron publish error:', error.message)
    }
  })
}
