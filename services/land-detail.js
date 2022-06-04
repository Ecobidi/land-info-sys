const LandDetailModel = require('../models/land-detail')

class LandDetailService {

  static QUERY_LIMIT_SIZE = 10;

  static async findById(id) {
    return LandDetailModel.findById(id)
  }

  static async findBySerialNumber(serial_number) {
    return LandDetailModel.findOne({serial_number})
  }

  static async searchBy(search = '', { offset = 0, limit = this.QUERY_LIMIT_SIZE}) {
    let pattern = new RegExp(search, 'ig')
    let docs = await LandDetailModel.find({ $or: [{owner_name: pattern}]}).skip(offset).limit(limit)
    return docs
  }
  
  static async findAll({ offset = 0, limit = this.QUERY_LIMIT_SIZE}) {
    return LandDetailModel.find().skip(offset).limit(limit)
  }

  static async countMatchingDocuments(search = '') {
    let numberOfDocs
    let pattern = new RegExp(search, 'ig')
    if (search) {
      numberOfDocs = await LandDetailModel.count({ $or:[{owner_name: pattern}]})
    } else {
      numberOfDocs = await LandDetailModel.count()
    }
    return numberOfDocs
  }

  static async create(dao) {
    return LandDetailModel.create(dao)
  }

  static async removeOne(serial_number) {
    return LandDetailModel.findOneAndDelete({serial_number})
  }

}

module.exports = LandDetailService