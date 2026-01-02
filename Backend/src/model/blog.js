const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },

    image: {
      type: String,
      default: '',
    },

    status: {
      type: String,
      enum: ['draft', 'scheduled', 'published'],
      default: 'published',
    },

    publishAt: { type: Date },
    publishedAt: { type: Date },

    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
