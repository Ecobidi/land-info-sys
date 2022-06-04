const router = require('express').Router()

const LandDetailController = require('../controllers/land-detail')
const UserController = require('../controllers/user')


router.get('/', LandDetailController.getLandDetailsPage)

router.get('/new', LandDetailController.createLandDetailPage)

router.post('/new', LandDetailController.createLandDetail)

// router.get('/profile/:serial_number', LandDetailController.getLandDetail)

router.get('/remove/:land_detail_id', UserController.hasAdminAuthorization, LandDetailController.removeLandDetail)

module.exports = router