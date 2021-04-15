const express = require("express")
const router = new express.Router()
require("../db/mongoose")
const User = require("../models/user")
const Post = require("../models/post")
const Notification = require("../models/notification")
const cors = require("cors")
const multer = require("multer")
const sharp = require("sharp")
const auth = require("../middleware/auth")
const bodyParser = require("body-parser")
const {default: validator} = require("validator")
router.use(
  bodyParser.urlencoded({
    extended: true
  })
)
router.use(bodyParser.json())
// router.use(cors())
// router.use((req, res, next) => {
//   res.append("Access-Control-Allow-Origin", ["*"])
//   res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
//   res.append("Access-Control-Allow-Headers", "Content-Type")
//   next()
// })

router.get("/", (req, res) => {
  res.redirect("/home")
})

router.get("/users", auth, async (req, res) => {
  const user = await User.find({$and: [{followers: {$ne: req.user._id}}, {_id: {$ne: req.user._id}}]})
    .limit(3)
    .sort({createdAt: -1})
  res.send(user)
})

router.get("/login", (req, res) => {
  // res.cookie("auth_token", "tokens")
  res.render("login", {})
  // res.send(req.cookies["auth_token"])
})
router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.username, req.body.password)
    const token = await user.generateAuthToken()
    res.cookie("auth_token", token, {maxAge: 24 * 60 * 60 * 1000})

    res.send(true)
  } catch (e) {
    res.send(false)
  }
})

router.post("/signup", async (req, res) => {
  const user = new User(req.body)
  try {
    user.avatar = "default.png"
    await user.save()
    const token = await user.generateAuthToken()
    res.cookie("auth_token", token, {maxAge: 24 * 60 * 60 * 1000})
    res.send(true)
  } catch (e) {
    res.send(false)
  }
})

router.get("/profile/:username", async (req, res) => {
  const username = req.params.username

  try {
    var user = await User.findOne({username})
    if (user) {
      var followerLengths = user.followers.length
      var followingLengths = user.followings.length
      res.send({
        _id: user._id,
        name: user.name,
        username: user.username,
        bio: user.bio,
        createdAt: user.createdAt,
        avatar: user.avatar,
        followers: followerLengths,
        following: followingLengths
      })
    }
  } catch (e) {
    console.log(e)
    res.send(e)
  }
})

router.get("/isOwner/:username", auth, async (req, res) => {
  const username = req.params.username
  try {
    if (username === req.user.username) {
      res.send(true)
    } else {
      res.send(false)
    }
  } catch (e) {
    console.log(e)
  }
})

router.patch("/follow/:guestUserName", auth, async (req, res) => {
  // const myUserName = req.user.username
  const guestUserName = req.params.guestUserName
  try {
    const user = await User.findOne({username: guestUserName})
    if (user && req.user.username != guestUserName) {
      const alreadyFollowing = req.user.followings.some((following) => following.equals(user._id))

      if (!alreadyFollowing || req.user.followings.length == 0) {
        // req.user.followings = req.user.followings.concat(user._id)
        await req.user.followings.push(user._id)
        await req.user.save()
        // user.followers = user.followers.concat(req.user._id)
        await user.followers.push(req.user._id)
        await user.save()
        let notification = new Notification()
        notification.receiver = user._id
        notification.sender = req.user._id
        notification.followed = true
        await notification.save()
        res.send({status: "followed"})
      } else {
        res.send("already following")
      }
    } else {
      throw new Error("No user found")
    }
  } catch (e) {
    res.send("Error:" + e)
  }
})
router.get("/notifications", auth, async (req, res) => {
  try {
    let notifications = await Notification.find({receiver: req.user._id}).populate("sender").populate("receiver").populate("post").sort({createdAt: -1}).limit(50)

    res.send(notifications)
  } catch (e) {
    res.send(e)
  }
})
router.patch("/unfollow/:guestUserName", auth, async (req, res) => {
  const myUserName = req.user.username
  const guestUserName = req.params.guestUserName
  try {
    const user = await User.findOne({username: guestUserName})
    if (user) {
      const following = req.user.followings.some((following) => following.equals(user._id))

      if (following) {
        req.user.followings = await req.user.followings.filter((following) => !following.equals(user._id))
        user.followers = await user.followers.filter((following) => !following.equals(req.user._id))
        await req.user.save()
        await user.save()
        res.send("unfollowed")
      } else {
        res.send("not following")
      }
    } else {
      throw new Error("No user found")
    }
  } catch (e) {
    res.send("Error" + e)
  }
})

router.get("/followStatus/:username", auth, async (req, res) => {
  const username = req.params.username
  try {
    const user = await User.findOne({username})
    if (user) {
      const following = req.user.followings.some((following) => following.equals(user._id))

      if (following) {
        res.send(true)
      } else {
        res.send(false)
      }
    } else {
      throw new Error("No user found")
    }
  } catch (e) {
    res.send(e)
  }
})

//posts from the users i follow
router.get("/myposts", auth, async (req, res) => {
  try {
    // await req.user.populate("posts").execPopulate()

    let posts = await Post.find({owner: {"$in": req.user.followings}}).populate("owner", "name")
    res.send(posts)
  } catch (e) {
    res.send("Error")
  }
})

router.get("/me", auth, async (req, res) => {
  try {
    res.send({
      _id: req.user._id,
      name: req.user.name,
      username: req.user.username,
      bio: req.user.bio,
      avatar: req.user.avatar
    })
  } catch (e) {
    console.log(e)
  }
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./client/public/avatar")
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname)
  }
})
const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error("Please upload an image"))
  }
  cb(undefined, true)
}
const upload = multer({
  storage,
  fileFilter
})

router.patch("/profile/update", auth, upload.single("file"), async (req, res) => {
  try {
    if (req.body.name != undefined) {
      req.user.name = req.body.name
    }
    if (req.body.bio != undefined) {
      req.user.bio = req.body.bio
    }

    if (req.file) {
      req.user.avatar = req.file.filename
    }
    await req.user.save()
  } catch (e) {
    res.send("Error" + e)
  }
})

router.get("/followerList/:username", async (req, res) => {
  const username = req.params.username
  try {
    var user = await User.findOne({username})
    if (user) {
      var followerList = await User.find({_id: {"$in": user.followers}})
        .select("name username bio avatar")
        .limit(100)
      // var followingList = await User.find({_id: {"$in": user.followings}})
      res.send({name: user.name, username: user.username, followerList})
    }
  } catch (e) {
    console.log(e)
  }
})
router.get("/followingList/:username", async (req, res) => {
  const username = req.params.username
  try {
    var user = await User.findOne({username})
    if (user) {
      var followingList = await User.find({_id: {"$in": user.followings}})
        .select("name username bio avatar")
        .limit(100)
      res.send({name: user.name, username: user.username, followingList})
    }
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
