const router = require('express').Router()

const LandTransferController = require('../controllers/land-transfer')
const UserController = require('../controllers/user')


router.get('/', LandTransferController.getLandTransfersPage)

router.get('/new', LandTransferController.createLandTransferPage)

router.post('/new', LandTransferController.createLandTransfer)

router.get('/remove/:land_transfer_id', UserController.hasAdminAuthorization, LandTransferController.removeLandTransfer)

module.exports = router