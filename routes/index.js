const router = require('express').Router()

const LandOwnerRouter = require('./land-owner')
const LandDetailRouter = require('./land-detail')
const LandTransferRouter = require('./land-transfer')
const UserRouter = require('./user')
const LoginRouter = require('./login')

const getDashboard = (req, res) => {
  res.render('dashboard')
}

router.use('/login', LoginRouter)

router.use((req, res, next) => {
  if (req.session.user) next()
  else res.redirect('/login')
})

router.get('/', getDashboard)

router.get('/dashboard', getDashboard)

router.use('/land-owners', LandOwnerRouter)

router.use('/land-details', LandDetailRouter)

router.use('/land-transfers', LandTransferRouter)

router.use('/users', UserRouter)

router.use('/logout', (req, res) => {
  req.session.user = null
  res.redirect('/login')
})

module.exports = router