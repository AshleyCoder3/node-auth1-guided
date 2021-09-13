const router = require('express').Router()
const User = require('../users/users-model')
const bcrypt = require('bcryptjs')

router.post('/register', async (req, res, next) => {
  const { username, password } = req.body
  const hash = bcrypt.hashSync(password, 8) // 2 ^ 8
  const newUser = { username, password: hash }

  const user = await User.add(newUser)

  res.status(201).json(user)
})

router.post('/login', async (req, res, next) => {
  res.json('login')
})

router.get('/logout', async (req, res, next) => {
  res.json('logout')
})

module.exports = router
