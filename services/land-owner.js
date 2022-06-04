const LandOwnerModel = require('../models/land-owner')

class LandOwnerService {

  static QUERY_LIMIT_SIZE = 10;

  static async findById(id) {
    return LandOwnerModel.findById(id)
  }

  static async findBySerialNumber(serial_number) {
    return LandOwnerModel.findOne({serial_number})
  }

  static async searchBy(search = '', { offset = 0, limit = this.QUERY_LIMIT_SIZE}) {
    let pattern = new RegExp(search, 'ig')
    let docs = await LandOwnerModel.find({ $or: [{first_name: pattern}, {surname: pattern}, {middle_name: pattern}]}).skip(offset).limit(limit)
    
    return docs
  }
  
  static async findAll({ offset = 0, limit = this.QUERY_LIMIT_SIZE}) {
    return LandOwnerModel.find().skip(offset).limit(limit)
  }

  static async countMatchingDocuments(search = '') {
    let numberOfDocs
    let pattern = new RegExp(search, 'ig')
    if (search) {
      numberOfDocs = await LandOwnerModel.count({ $or: [{first_name: pattern}, {surname: pattern}, {middle_name: pattern}]})
    } else {
      numberOfDocs = await LandOwnerModel.count()
    }
    return numberOfDocs
  }

  static async create(dao) {
    return LandOwnerModel.create(dao)
  }

  // static async updateOne(update) {
  //   return LandOwnerModel.findByIdAndUpdate(update._id, {$set: update})
  // }

  static async removeOne(serial_number) {
    return LandOwnerModel.findOneAndDelete({serial_number})
  }

}

module.exports = LandOwnerService