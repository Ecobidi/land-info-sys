const LandTransferModel = require('../models/land-transfer')

class LandTransferService {

  static QUERY_LIMIT_SIZE = 10;

  static async findById(id) {
    return LandTransferModel.findById(id)
  }

  static async findBySerialNumber(serial_number) {
    return LandTransferModel.findOne({serial_number})
  }

  static async searchBy(search = '', { offset = 0, limit = this.QUERY_LIMIT_SIZE}) {
    let pattern = new RegExp(search, 'ig')
    let docs = await LandTransferModel.find({ $or: [{prev_owner_name: pattern}, {new_owner_name: pattern}]}).skip(offset).limit(limit)
    return docs
  }
  
  static async findAll({ offset = 0, limit = this.QUERY_LIMIT_SIZE}) {
    return LandTransferModel.find().skip(offset).limit(limit)
  }

  static async countMatchingDocuments(search = '') {
    let numberOfDocs
    let pattern = new RegExp(search, 'ig')
    if (search) {
      numberOfDocs = await LandTransferModel.count({ $or:[{prev_owner_name: pattern}, {new_owner_name: pattern}]})
    } else {
      numberOfDocs = await LandTransferModel.count()
    }
    return numberOfDocs
  }

  static async create(dao) {
    return LandTransferModel.create(dao)
  }

  static async removeOne(serial_number) {
    return LandTransferModel.findOneAndDelete({serial_number})
  }

}

module.exports = LandTransferService