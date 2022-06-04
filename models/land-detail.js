const mongoose = require('mongoose')
const DBCounterModel = require("./db_counter")

let LandDetailSchema = new mongoose.Schema({
  serial_number: {
    type: Number,
    unique: true,
  },
  land_reg_no: String,
  c_of_o_reg_no: String, 
  plot_number: String,
  location: String,
  plot_size: String,
  survey_plan_no: String,
  land_use_purpose: String,
  owner: Number,
  owner_name: String,
}, {timestamps: {createdAt: true}})

async function getNextSequenceValue(sequenceName) {
  var sequenceDocument = await DBCounterModel.findOneAndUpdate({ key: sequenceName }, { $inc: { sequence_value: 1}})
  return sequenceDocument.sequence_value
}

LandDetailSchema.pre("save", async function(next){
  if (this.serial_number == undefined) {
    this.serial_number = await getNextSequenceValue("land_details_id")
  }
  next()
})

module.exports = mongoose.model('land_detail', LandDetailSchema)
