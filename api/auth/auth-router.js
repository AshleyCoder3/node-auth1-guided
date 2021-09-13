const router = require('express').Router()

router.post('/register', async (req, res, next) => {
  res.json('register')
})
router.post('/login', async (req, res, next) => {
  res.json('login')
})
router.get('/logout', async (req, res, next) => {
  res.json('logout')
})

module.exports = router
