const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
const validator = require("validator")

const postSchema = mongoose.Schema(
  {
    post_data: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 280
    },

    post_img: [
      {
        type: String
      }
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    parentPostId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    reposts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  {timestamps: true}
)

const Post = mongoose.model("Post", postSchema)
postSchema.plugin(uniqueValidator)
module.exports = Post
