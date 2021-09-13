const router = require('express').Router()

router.post('/auth/register', async (req, res, next) => {
  res.json('register')
})
router.post('/auth/login', async (req, res, next) => {
  res.json('login')
})
router.post('/auth/register', async (req, res, next) => {
  res.json('register')
})


module.exports = router
