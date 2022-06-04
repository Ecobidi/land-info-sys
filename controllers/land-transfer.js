const LandTransferService = require('../services/land-transfer')
const LandDetailModel = require('../models/land-detail')

class LandTransferController {

  static async getLandTransfer(req, res) {
    let serial_number = req.params.serial_number
    let land_transfer = await LandTransferService.findBySerialNumber(serial_number)
    res.render('land-transfer', { land_transfer })
  }

  static async getLandTransfersPage(req, res) {
    let pageNumber = Number.parseInt(req.query.page ? req.query.page : 1)
    let limit_size = Number.parseInt(req.query.limit || LandTransferService.QUERY_LIMIT_SIZE)
    let offset = pageNumber * limit_size - limit_size
    let search = req.query.search
    let land_transfers, totalDocuments
    
    if (search) {
      land_transfers = await LandTransferService.searchBy(search, {limit: limit_size, offset}) 
      totalDocuments = await LandTransferService.countMatchingDocuments(search)
    } else {
      land_transfers = await LandTransferService.findAll({limit: limit_size, offset})
      totalDocuments = await LandTransferService.countMatchingDocuments()
    }
    let totalNumberOfPages = Math.ceil(await totalDocuments / limit_size)

    res.render('land-transfers', {land_transfers, currentPage: pageNumber, totalNumberOfPages, totalDocuments, limit_size, offset, searchTerm: search })
  }

  static async createLandTransferPage(req, res) {
    res.render('land-transfer-new')
  }

  static async createLandTransfer(req, res) {
    let dao = req.body
    let landDetail = await LandDetailModel.findOne({ land_reg_no: dao.land_reg_no })
    if (landDetail) {
      landDetail.owner_name = dao.new_owner_name
      await landDetail.save()
    }
    try {
      await LandTransferService.create(dao)
      req.flash('success_msg', "Record successfully added")
      res.redirect('/land-transfers')
    } catch (err) {
      console.log(err)
      res.redirect('/land-transfers')
    }
  }

  static async removeLandTransfer(req, res) {
    try {
      await LandTransferService.removeOne(req.params.land_transfer_id)
      req.flash('success_msg', 'Record removed successfully')
      res.redirect('/land-transfers')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Error removing record')
      res.redirect('/land-transfers')
    }
  }

}

module.exports = LandTransferController