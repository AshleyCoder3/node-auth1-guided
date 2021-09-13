const router = require('express').Router()
const User = require('../users/users-model')
const bcrypt = require('bcryptjs')

router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const hash = bcrypt.hashSync(password, 8) // 2 ^ 8
    const newUser = { username, password: hash }
    const user = await User.add(newUser)

    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const [existingUser] = await User.findBy({ username })

    // check if username in db
    // recreate hash from password
    // if username exists, AND hash matches the one in db
    // THEN START A SESSION WITH THE HELP OF A LIB expresse-session

    res.json('login')
  } catch (err) {
    next(err)
  }
})

router.get('/logout', async (req, res, next) => {
  res.json('logout')
})

module.exports = router
