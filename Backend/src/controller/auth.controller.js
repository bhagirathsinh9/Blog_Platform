const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signupUser = async (req, res) => {
  try {
    const { email, name, password } = req.body

    const userExist = await User.find({ email })
    if (!userExist) {
      return res
        .status(409)
        .json({ success: false, message: 'User Already Exists', data: null })
    }
    const saltValue = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, saltValue)
    const newUser = await User.create({
      email,
      name,
      password: hashPassword,
    })

    return res.status(201).json({
      success: true,
      message: 'User Signup Successfully',
      data: newUser,
    })
  } catch (error) {
    console.error('INTERNAL_SERVER ERROR:', error)
    return res.status(500).json({
      success: false,
      message: 'INTERNAL_SERVER ERROR',
    })
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User Not Found', data: null })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid Password', data: null })
    }
    const token = await jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '30d' },
    )

    return res
      .status(200)
      .json({
        success: true,
        message: 'User Login Successfully',
        data: { token, user },
      })
  } catch (error) {
    console.error('INTERNAL_SERVER ERROR:', error)
    return res.status(500).json({
      success: false,
      message: 'INTERNAL_SERVER ERROR',
    })
  }
}
