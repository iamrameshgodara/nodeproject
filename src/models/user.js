const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const uniqueValidator = require("mongoose-unique-validator")
const jwt = require("jsonwebtoken")
const validator = require("validator")
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
      maxlength: 15,
      lowercase: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid")
        }
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password cannot contain "password"')
        }
      }
    },
    avatar: {
      type: String
      // type: Buffer
    },
    bio: {
      type: String,
      maxlength: 50,

      trim: true
    },
    followings: [
      {
        type: mongoose.Schema.Types.ObjectId
      }
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId
      }
    ],
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {timestamps: true}
)

userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "owner"
})

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({username})
  if (!user) {
    throw new Error("Unable to login")
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error("Unable to logins")
  }
  return user
}
userSchema.methods.generateAuthToken = async function () {
  user = this
  const token = jwt.sign({_id: user._id}, "thegreatmsd")
  user.tokens = user.tokens.concat({token})
  await user.save()
  return token
}

userSchema.pre("save", async function (next) {
  const user = this
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8)
  }
})

const User = mongoose.model("User", userSchema)
userSchema.plugin(uniqueValidator)

module.exports = User
