const mongoose = require("mongoose")

const commentSchema = mongoose.Schema(
  {
    parentPostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true
    },
    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: false
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    detail: {
      type: String,
      required: true
    }
  },
  {timestamps: true}
)
const Comment = mongoose.model("Comment", commentSchema)
module.exports = Comment
