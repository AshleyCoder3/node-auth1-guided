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

    if (existingUser && bcrypt.compareSync(password, existingUser.password)) {
      // here this means user exists AND credentials good
      console.log('starting session!!!')
      req.session.user = existingUser
      res.json({
        message: `welcome back, ${existingUser.username}`
      })
    } else {
      next({ status: 401, message: 'bad credentials!' })
    }
  } catch (err) {
    next(err)
  }
})

router.get('/logout', (req, res ) => {
  if (req.session.user) {
    req.session.destroy()
  } else {
    res.json({
      message: 'you were not logged in to begin with'
    })
  }
})

router.get('/logout', async (req, res, next) => {
  res.json('logout')
})

module.exports = router
