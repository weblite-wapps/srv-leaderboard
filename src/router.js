const express = require("express")
const db = require("./db")
const bodyParser = require("body-parser")

const router = express.Router()
router.use(bodyParser.json())

router.post("/insertScore", ({ body }, res) =>
  db.insertScore(body).then(() => res.status(200).send())
)

router.get("/getTopScores", ({ query }, res) =>
  db
    .getTopScores(query)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
)

router.get("/getUserTopScores", ({ query }, res) =>
  db
    .getUserTopScores(query)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
)

exports.router = router
