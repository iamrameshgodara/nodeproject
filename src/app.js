const express = require("express")
require("./db/mongoose")
const path = require("path")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express()
require("dotenv").config()
app.use(cookieParser())

app.use(cors({origin: true, credentials: true}))
// app.use(cors({credentials: true}))

// header("Access-Control-Allow-Headers", "Content-Type")
const hbs = require("hbs")
// const server = require("http").createServer(app)
// const io = require("socket.io")(server)
// require("./socket")(server)

// io.on("connection", (socket) => {
//   console.log("connected")
// socket.on("newUser", (username) => {
//   console.log(`${username} has joined the party.`)
// })
// })

app.use(express.json())
app.use(express.urlencoded({extended: true}))
const userRouter = require("./routers/user")
const postRouter = require("./routers/post")
const messageRouter = require("./routers/message")
const publicDirectoryPath = path.join(__dirname, "../public")
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.set("view engine", "hbs")
app.set("views", viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
app.use(userRouter)
app.use(postRouter)
app.use(messageRouter)

//Handle production
if (process.env.NODE_ENV === "production") {
  //static folder
  app.use(express.static(__dirname + "/public/"))

  //Handle single page applications
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"))
}
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log("Server is up on port " + port)
})
