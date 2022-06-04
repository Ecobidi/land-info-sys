const mongoose = require('mongoose')
const DBCounterModel = require("./db_counter")

let LandTransferSchema = new mongoose.Schema({
  serial_number: {
    type: Number,
    unique: true,
  },
  land_reg_no: String,
  prev_owner_name: String,
  new_owner_name: String,
  date_of_transfer: String,
  size_of_transferred_land: String,
  prev_owner_witnesses: String,
  new_owner_witnesses: String,
}, {timestamps: {createdAt: true}})

async function getNextSequenceValue(sequenceName) {
  var sequenceDocument = await DBCounterModel.findOneAndUpdate({ key: sequenceName }, { $inc: { sequence_value: 1}})
  return sequenceDocument.sequence_value
}

LandTransferSchema.pre("save", async function(next){
  if (this.serial_number == undefined) {
    this.serial_number = await getNextSequenceValue("land_transfers_id")
  }
  next()
})

module.exports = mongoose.model('land_transfer', LandTransferSchema)
