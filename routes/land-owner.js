const router = require('express').Router()

const LandOwnerController = require('../controllers/land-owner')
const UserController = require('../controllers/user')

router.get('/', LandOwnerController.getLandOwnersPage)

router.get('/new', LandOwnerController.createLandOwnerPage)

router.post('/new', LandOwnerController.createLandOwner)

router.get('/profile/:serial_number', LandOwnerController.getOwnerProfile)

router.get('/remove/:land_owner_id', UserController.hasAdminAuthorization, LandOwnerController.removeLandOwner)

module.exports = router