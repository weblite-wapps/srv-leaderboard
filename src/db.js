const mongoose = require("mongoose")
const models = require("./db_models")

exports.connect = name => {
  mongoose.connect("mongodb://localhost/" + name)

  var db = mongoose.connection
  db.on("error", console.error.bind(console, "connection error:"))
  db.once("open", () => {
    console.log("connected to database successfully ...")
  })
}

exports.insertScore = info => {
  //info = {wisId , wappId , userName , score}

  const { wisId, userName } = info
  return models.scoreInfo
    .findOne({ wisId, userName })
    .then(res => {
      if (res)
        return models.scoreInfo
          .update({ wisId, userName }, { $max: { score: info.score } }, info)
          .exec()
      else return new models.scoreInfo(info).save()
    })
    .catch(err => console.log(err))
}

exports.getTopScores = ({ wisId, numOfScores }) =>
  models.scoreInfo
    .find({ wisId: wisId })
    .select("userName score")
    .sort({ score: "desc" })
    .limit(Number(numOfScores) || 1000)
    .then(res => res)
    .catch(err => console.log(err))

exports.getUserTopScores = ({ wappId, userName }) =>
  models.scoreInfo
    .find({ wappId, userName })
    .select("userName score")
    .sort({ score: "desc" })
    .then(res => res)
    .catch(err => console.log(err))
