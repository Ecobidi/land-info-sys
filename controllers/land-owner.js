const LandOwnerService = require('../services/land-owner')

class LandOwnerController {

  static async getOwnerProfile(req, res) {
    let serial_number = req.params.serial_number
    let land_owner = await LandOwnerService.findBySerialNumber(serial_number)
    res.render('land-owner-profile', { land_owner })
  }

  static async getLandOwnersPage(req, res) {
    let pageNumber = Number.parseInt(req.query.page ? req.query.page : 1)
    let limit_size = Number.parseInt(req.query.limit || LandOwnerService.QUERY_LIMIT_SIZE)
    let offset = pageNumber * limit_size - limit_size
    let search = req.query.search
    let land_owners, totalDocuments
    
    if (search) {
      land_owners = await LandOwnerService.searchBy(search, {limit: limit_size, offset}) 
      totalDocuments = await LandOwnerService.countMatchingDocuments(search)
    } else {
      land_owners = await LandOwnerService.findAll({limit: limit_size, offset})
      totalDocuments = await LandOwnerService.countMatchingDocuments()
    }
    let totalNumberOfPages = Math.ceil(await totalDocuments / limit_size)

    res.render('land-owners', {land_owners, currentPage: pageNumber, totalNumberOfPages, totalDocuments, limit_size, offset, searchTerm: search })
  }

  static async createLandOwnerPage(req, res) {
    res.render('land-owner-new')
  }

  static async createLandOwner(req, res) {
    let dao = req.body
    try {
      await LandOwnerService.create(dao)
      req.flash('success_msg', "Record successfully added")
      res.redirect('/land-owners')
    } catch (err) {
      console.log(err)
      res.redirect('/land-owners')
    }
  }

  static async removeLandOwner(req, res) {
    try {
      await LandOwnerService.removeOne(req.params.land_owner_id)
      req.flash('success_msg', 'Record emoved successfully')
      res.redirect('/land-owners')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Error removing record')
      res.redirect('/land-owners')
    }
  }

}

module.exports = LandOwnerController