const LandDetailService = require('../services/land-detail')

class LandDetailController {

  static async getLandDetail(req, res) {
    let serial_number = req.params.serial_number
    let land_detail = await LandDetailService.findBySerialNumber(serial_number)
    res.render('land-detail', { land_detail })
  }

  static async getLandDetailsPage(req, res) {
    let pageNumber = Number.parseInt(req.query.page ? req.query.page : 1)
    let limit_size = Number.parseInt(req.query.limit || LandDetailService.QUERY_LIMIT_SIZE)
    let offset = pageNumber * limit_size - limit_size
    let search = req.query.search
    let land_details, totalDocuments
    
    if (search) {
      land_details = await LandDetailService.searchBy(search, {limit: limit_size, offset}) 
      totalDocuments = await LandDetailService.countMatchingDocuments(search)
    } else {
      land_details = await LandDetailService.findAll({limit: limit_size, offset})
      totalDocuments = await LandDetailService.countMatchingDocuments()
    }
    let totalNumberOfPages = Math.ceil(await totalDocuments / limit_size)

    res.render('land-details', {land_details, currentPage: pageNumber, totalNumberOfPages, totalDocuments, limit_size, offset, searchTerm: search })
  }

  static async createLandDetailPage(req, res) {
    res.render('land-detail-new')
  }

  static async createLandDetail(req, res) {
    let dao = req.body
    try {
      await LandDetailService.create(dao)
      req.flash('success_msg', "Record successfully added")
      res.redirect('/land-details')
    } catch (err) {
      console.log(err)
      res.redirect('/land-details')
    }
  }

  static async removeLandDetail(req, res) {
    try {
      let doc = await LandDetailService.removeOne(req.params.land_detail_id)
      // // remove photo
      // if (doc.photo_public_id) {
      //   let result = await removeUploadedFile(doc.photo_public_id)  
      // }
      // await fs.unlink(process.cwd() + '/uploads/images/members/' + doc.photo)
      req.flash('success_msg', 'Record emoved successfully')
      res.redirect('/land-details')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Error removing record')
      res.redirect('/land-details')
    }
  }

}

module.exports = LandDetailController