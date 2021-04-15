const express = require("express")
const router = new express.Router()
require("../db/mongoose")
const User = require("../models/user")
const Post = require("../models/post")
const Comment = require("../models/comment")
const Notification = require("../models/notification")
const cors = require("cors")
const multer = require("multer")
const sharp = require("sharp")
const auth = require("../middleware/auth")
const bodyParser = require("body-parser")
router.use(
  bodyParser.urlencoded({
    extended: true
  })
)
router.use(bodyParser.json())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./client/public/postImg")
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname)
  }
})
const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|mp4)$/)) {
    return cb(new Error("Please upload valid file"))
  }
  cb(undefined, true)
}
const upload = multer({
  storage,
  fileFilter
})

router.post("/posts", auth, upload.array("postImages", 2), async (req, res) => {
  // const post = new Post(req.body)

  try {
    let post = new Post()
    if (req.files) {
      req.files.forEach((file) => {
        post.post_img.push(file.filename)
      })
    }

    if (req.body.postDescription) {
      post.post_data = req.body.postDescription
    }
    if (req.files || req.body.postDescription) {
      post.owner = req.user._id
    }
    //   const buffer = await sharp(req.file.buffer)
    //     .resize({width: 250, height: 250})
    //     .png()
    //     .toBuffer()
    //   post.post_img = buffer
    await post.save()
    res.send(post)
  } catch (e) {
    res.send(e)
  }
})

router.post("/comment", auth, async (req, res) => {
  try {
    const comment = new Comment()
    comment.parentPostId = req.body.parentPostId
    comment.owner = req.user._id
    comment.detail = req.body.commentText
    await comment.save()

    res.send("done")
  } catch (e) {
    console.log(e)
  }
})

router.get("/search", async (req, res) => {
  const query = req.query.q
  let fetch = req.query.f
  try {
    if (query && !fetch) {
      let posts = await Post.find({post_data: new RegExp(query, "i")})
        .populate("owner")
        .limit(50)
      res.send(posts)
    } else if (fetch) {
      let users = await User.find({username: new RegExp(query, "i")})
      res.send(users)
    }
  } catch (e) {
    res.send(e)
  }
})
router.get("/likes/:postId", async (req, res) => {
  const postId = req.params.postId
  try {
    const post = await Post.findById(postId).populate("likes", "name username bio avatar")
    res.send(post.likes)
  } catch (e) {
    console.log(e)
  }
})
router.get("/repostListOnPost/:postId", async (req, res) => {
  const postId = req.params.postId
  try {
    const post = await Post.findById(postId).populate("reposts", "name username bio avatar")
    res.send(post.reposts)
  } catch (e) {
    console.log(e)
  }
})

router.get("/likeStatus/:postId", auth, async (req, res) => {
  const postId = req.params.postId
  try {
    const post = await Post.findOne({_id: postId})
    if (post) {
      const liked = post.likes.some((like) => like.equals(req.user._id))

      if (liked) {
        res.send(true)
      } else {
        res.send(false)
      }
    } else {
      throw new Error("No Post found")
    }
  } catch (e) {
    console.log("Error" + e)
  }
})

router.get("/repostStatus/:postId", auth, async (req, res) => {
  const postId = req.params.postId
  try {
    const post = await Post.findOne({_id: postId})
    if (post) {
      const reposted = post.reposts.some((post) => post.equals(req.user._id))

      if (reposted) {
        res.send(true)
      } else {
        res.send(false)
      }
    } else {
      throw new Error("No Post found")
    }
  } catch (e) {
    console.log("Error" + e)
  }
})
router.get("/post/:postId", async (req, res) => {
  const postId = req.params.postId
  try {
    let post = await Post.findOne({_id: postId}).populate("owner", "name username avatar")
    // post.populate("owner").execPopulate()
    // const owner = await User.findOne({_id: post.owner}).select(" -followings -followers -password -tokens -email")

    res.send(post)
  } catch (e) {
    res.send(e)
  }
})

router.get("/comments/:parentPostId", async (req, res) => {
  const parentPostId = req.params.parentPostId
  try {
    const comments = await Comment.find({parentPostId}).populate("owner", "name username bio avatar").limit(50).sort({createdAt: -1})
    res.send(comments)
  } catch (e) {
    res.send(e)
  }
})

router.get("/posts/:UserId", async (req, res) => {
  const _id = req.params.UserId
  try {
    let posts = await Post.find({owner: _id}).sort({createdAt: -1}).limit(50)

    res.send(posts)
  } catch (e) {
    res.send("error:" + e)
  }
})

router.get("/likedPosts/:username", async (req, res) => {
  const username = req.params.username
  try {
    const user = await User.findOne({username})
    const posts = await Post.find({likes: user._id}).limit(50).populate("owner", "name username avatar")
    res.send(posts)
  } catch (e) {
    res.send(e)
  }
})
router.get("/reposts/:username", async (req, res) => {
  const username = req.params.username
  try {
    const user = await User.findOne({username})
    const posts = await Post.find({"reposts": user._id}).limit(50).populate("owner", "name username avatar").sort()
    res.send(posts)
  } catch (e) {
    console.log(e)
  }
})
router.get("/mediaposts/:username", async (req, res) => {
  const username = req.params.username
  try {
    const user = await User.findOne({username})
    // const posts = await Post.find({"reposts": user._id}).limit(50).populate("owner", "name username avatar")
    const posts = await Post.find({$and: [{$where: "this.post_img.length>0"}, {owner: user._id}]})
      .limit(50)
      .populate("owner", "name username avatar")
    res.send(posts)
  } catch (e) {
    console.log(e)
  }
})
router.get("/postsOfFollowingUsers", auth, async (req, res) => {
  try {
    let posts = await Post.find({owner: {"$in": req.user.followings}})
      .populate("owner", "name username avatar")
      .sort({createdAt: -1})
      .limit(50)
    // let repostedPosts = await Post.find({reposts: {"$in": req.user.followings}})
    //   .populate("owner", "name username avatar")
    //   .sort({createdAt: -1})
    res.send(posts)
  } catch (e) {}
})
router.delete("/posts/:id", auth, async (req, res) => {
  try {
    // const post = await Post.findByIdAndDelete(req.params.id)
    const post = await Post.findOneAndDelete({_id: req.params.id, owner: req.user._id})
    if (!post) {
      res.status(404).send("No post")
    }
    res.send(post)
  } catch (e) {}
})
router.delete("/comment/:id", auth, async (req, res) => {
  try {
    // const post = await Post.findByIdAndDelete(req.params.id)
    const comment = await Comment.findOneAndDelete({_id: req.params.id, owner: req.user._id})
    if (!comment) {
      res.status(404).send("No post")
    }
    res.send("comment deleted")
  } catch (e) {}
})

router.patch("/like/:postId", auth, async (req, res) => {
  // const myUserName = req.user.username
  const postId = req.params.postId
  try {
    const post = await Post.findOne({_id: postId}).populate("owner")

    if (post) {
      const alreadyLiked = post.likes.some((like) => like.equals(req.user._id))

      if (!alreadyLiked || post.likes.length == 0) {
        await post.likes.push(req.user._id)
        await post.save()
        if (!req.user._id.equals(post.owner._id)) {
          let notification = new Notification()
          notification.receiver = post.owner._id
          notification.sender = req.user._id
          notification.liked = true
          notification.post = postId
          await notification.save()
        }
        res.send({status: "liked"})
      } else {
        res.send("already liked")
      }
    } else {
      throw new Error("No user found")
    }
  } catch (e) {
    res.send("Error:" + e)
  }
})
router.patch("/repost/:postId", auth, async (req, res) => {
  // const myUserName = req.user.username
  const postId = req.params.postId
  try {
    const post = await Post.findOne({_id: postId}).populate("owner")

    if (post) {
      const alreadyReposted = post.reposts.some((repost) => repost.equals(req.user._id))

      if (!alreadyReposted || post.reposts.length == 0) {
        await post.reposts.push(req.user._id)
        await post.save()
        if (!req.user._id.equals(post.owner._id)) {
          let notification = new Notification()
          notification.receiver = post.owner._id
          notification.sender = req.user._id
          notification.reposted = true
          notification.post = postId
          await notification.save()
        }
        res.send({status: "reposted"})
      } else {
        res.send("already reposted")
      }
    } else {
      throw new Error("No user found")
    }
  } catch (e) {
    res.send("Error:" + e)
  }
})

router.patch("/dislike/:postId", auth, async (req, res) => {
  const postId = req.params.postId
  try {
    const post = await Post.findOne({_id: postId})
    if (post) {
      const Liked = post.likes.some((like) => like.equals(req.user._id))

      if (Liked) {
        post.likes = await post.likes.filter((like) => !like.equals(req.user._id))
        await post.save()
        res.send("disliked")
      } else {
        res.send("didn't like")
      }
    } else {
      throw new Error("No user found")
    }
  } catch (e) {
    res.send("Error" + e)
  }
})
router.patch("/removeRepost/:postId", auth, async (req, res) => {
  const postId = req.params.postId
  try {
    const post = await Post.findOne({_id: postId})
    if (post) {
      const rePosted = post.reposts.some((repost) => repost.equals(req.user._id))

      if (rePosted) {
        post.reposts = await post.reposts.filter((repost) => !repost.equals(req.user._id))
        await post.save()
        res.send("disReposted")
      } else {
        res.send("didn't repost")
      }
    } else {
      throw new Error("No user found")
    }
  } catch (e) {
    res.send("Error" + e)
  }
})

router.get("/newPost", (req, res) => {
  res.render("newPost")
})
router.post("/newPost", async (req, res) => {
  const post = new Post(req.body)
  try {
    await post.save()
    res.redirect("/home")
  } catch (e) {
    res.send(e)
  }
})

module.exports = router
