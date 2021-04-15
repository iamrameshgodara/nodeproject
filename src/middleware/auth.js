const User = require("../models/user")
const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
  try {
    const {cookies} = await req
    // console.log(cookies)
    let token = cookies.auth_token
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUyZWI4NjcxYzc2NDA1YTI3N2Y4ZWYiLCJpYXQiOjE2MTYwNDY5ODJ9.eW_gtYxsrVu8ZLhC1JubvLgKFldjSuCw_uAZlIkuAqc"
    // console.log(token)
    // let token = req.cookies["auth_token"]
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDFmZDg0NjRlNmUyNjEyOWUzOTllYWQiLCJpYXQiOjE2MTI3MDAwOTd9.MDPWBT4 - InseXV8xF_933b2kbF6SMourAzHrBb3c41M
    if (!cookies.auth_token) {
      token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDcxZDI3MWVkYWQ5MzIwMDdkMzZmNzkiLCJpYXQiOjE2MTgwNzIxNzd9.zMA8RUcWrsK_0tH0MKdctRim8K8C_ykJUiJ8brgDT0Q"
    }
    const decoded = jwt.verify(token, "thegreatmsd") //check token is correct not expired
    const user = await User.findOne({_id: decoded._id, "tokens.token": token}) //decoded has _id property dwe preloaded in model

    if (!user) {
      throw new Error("no user found")
    }
    req.token = token
    req.user = user
    // console.log(req.token, req.user)
    next()
  } catch (e) {
    res.send("error" + e)
  }
}
module.exports = auth
