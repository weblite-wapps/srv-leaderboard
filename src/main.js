//modules
var express = require("express")
const path = require("path")
const http = require("http")
const fs = require("fs")
const cors = require("cors")

//files
var router = require("./router")
var db = require("./db")

var app = express()

db.connect("leaderboard_db")
app.use(cors({ origin: "*" }))
app.use("/", router.router)

app.listen(5100)

