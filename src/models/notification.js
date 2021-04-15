const mongoose = require("mongoose")

const NotificationSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    followed: {
      type: Boolean
    },
    liked: {
      type: Boolean
    },
    reposted: {
      type: Boolean
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    },
    content: {
      type: String
    }
  },
  {timestamps: true}
)

const Notification = mongoose.model("Notification", NotificationSchema)
module.exports = Notification
