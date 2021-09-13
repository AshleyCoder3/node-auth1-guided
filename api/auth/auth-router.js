const router = require('express').Router()
const bcrypt = require('bcryptjs')

router.post('/register', async (req, res, next) => {
  const { username, password } = req.body
  const hash = bcrypt.hashSync(password, )
  res.json('register')
})

router.post('/login', async (req, res, next) => {
  res.json('login')
})

router.get('/logout', async (req, res, next) => {
  res.json('logout')
})

module.exports = router
