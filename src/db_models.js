var mongoose = require("mongoose")

exports.scoreInfo = mongoose.model(
  "scoreInfo",
  new mongoose.Schema({
    wisId: String,
    wappId: String,
    userName: String,
    score: Number
  })
)
