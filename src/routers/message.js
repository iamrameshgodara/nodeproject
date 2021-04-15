const express = require("express")
const router = new express.Router()
require("../db/mongoose")
const app = express()

const User = require("../models/user")
const Post = require("../models/post")
const Message = require("../models/message")

const bodyParser = require("body-parser")
router.use(
  bodyParser.urlencoded({
    extended: true
  })
)

router.use(bodyParser.json())

router.get("/message", (req, res) => {
  res.send("Messages")
})

module.exports = router
