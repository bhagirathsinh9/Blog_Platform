const User = require('../model/user')
const jwt = require('jsonwebtoken')

const isAuthenticated = async (req, res, next) => {
  const authHeader = req.header('Authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Access Denied. No token provided!' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    const user = await User.findById(decoded.userId)
    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    req.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    }

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token!' })
  }
}

module.exports = { isAuthenticated }
