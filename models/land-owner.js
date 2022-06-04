const mongoose = require('mongoose')
const DBCounterModel = require("./db_counter")

let LandOwnerSchema = new mongoose.Schema({
  serial_number: {
    type: Number,
    unique: true,
  },
  surname: {
    type: String,
    required: true,
  },
  other_names: {
    type: String,
    required: true,
  },
  gender: String,
  occupation: String,
  home_address: String,
  office_address: String,
  phone: String,

}, {timestamps: {createdAt: true}})

async function getNextSequenceValue(sequenceName) {
  var sequenceDocument = await DBCounterModel.findOneAndUpdate({ key: sequenceName }, { $inc: { sequence_value: 1}})
  return sequenceDocument.sequence_value
}

LandOwnerSchema.pre("save", async function(next){
  if (this.serial_number == undefined) {
    this.serial_number = await getNextSequenceValue("land_owners_id")
  }
  next()
})

module.exports = mongoose.model('land_owner', LandOwnerSchema)
