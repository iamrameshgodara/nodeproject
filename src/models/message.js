const mongoose = require("mongoose")

const MessageSchema = mongoose.Schema({
  message: {
    text: {
      type: String,
      required: true
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
})
const Message = mongoose.model("Message", MessageSchema)

module.exports = Message
