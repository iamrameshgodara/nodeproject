const axios = require("axios")
//DON'T FORGET TO ADD CORS MODULE AND APP.USE(CORS()) IN FILE WHERE EXPRESSIS USED APP.JS
// const config = require("../vue.config")
// console.log(config.devServer.proxy.api.target)
// const URL = config.devServer.proxy.api.target
const URL = "https://ramesh-node-app.herokuapp.com"
// const URL = "http://localhost:3000"
axios.defaults.withCredentials = true
const getAllUsers = async () => {
  try {
    const res = await axios.get(URL + "/users")
    const data = res.data
    return data
  } catch (e) {
    return e
  }
}
const getNotifications = async () => {
  try {
    const res = await axios.get(URL + "/notifications/")
    const data = res.data
    return data
  } catch (e) {
    return e
  }
}
const myProfile = async () => {
  try {
    const res = await axios.get(URL + "/me")
    const data = res.data
    return data
  } catch (e) {
    return e
  }
}
const postsOfFollowingUsers = async () => {
  try {
    const res = await axios.get(URL + "/postsOfFollowingUsers")
    const data = res.data
    return data
  } catch (e) {
    return e
  }
}
const getSinglePost = async (postId) => {
  try {
    const res = await axios.get(URL + "/post/" + postId)
    const data = res.data
    return data
  } catch (e) {
    return e
  }
}
const getPosts = async (userid) => {
  try {
    const res = await axios.get(URL + "/posts/" + userid)
    const data = res.data

    return data
  } catch (e) {
    return e
  }
}
const getLikedPosts = async (username) => {
  try {
    const res = await axios.get(URL + "/likedPosts/" + username)
    const data = res.data
    return data
  } catch (e) {
    return e
  }
}
const getLikesList = async (postId) => {
  try {
    const res = await axios.get(URL + "/likes/" + postId)
    const data = res.data
    return data
  } catch (e) {
    return e
  }
}
const getRepostsOnPostList = async (postId) => {
  try {
    const res = await axios.get(URL + "/repostListOnPost/" + postId)
    const data = res.data
    return data
  } catch (e) {
    return e
  }
}
const getReposts = async (username) => {
  try {
    const res = await axios.get(URL + "/reposts/" + username)
    const data = res.data
    return data
  } catch (e) {
    return e
  }
}
const getMediaPosts = async (username) => {
  try {
    const res = await axios.get(URL + "/mediaposts/" + username)
    const data = res.data
    return data
  } catch (e) {
    return e
  }
}
const getSearchResults = async (query) => {
  try {
    const res = await axios.get(URL + "/search?q=" + query)
    const data = res.data
    return data
  } catch (e) {
    return e
  }
}
const likePost = async (postId) => {
  try {
    await axios.patch(URL + "/like/" + postId)
  } catch (e) {
    return e
  }
}
const rePost = async (postId) => {
  try {
    await axios.patch(URL + "/repost/" + postId)
  } catch (e) {
    return e
  }
}

const dislikePost = async (postId) => {
  try {
    await axios.patch(URL + "/dislike/" + postId)
  } catch (e) {
    return e
  }
}

const removeRepost = async (postId) => {
  try {
    await axios.patch(URL + "/removeRepost/" + postId)
  } catch (e) {
    return e
  }
}

const likeStatus = async (postId) => {
  try {
    const res = await axios.get(URL + "/likeStatus/" + postId)
    const data = await res.data
    return data
  } catch (e) {
    return e
  }
}
const rePostStatus = async (postId) => {
  try {
    const res = await axios.get(URL + "/repostStatus/" + postId)
    const data = await res.data
    return data
  } catch (e) {
    return e
  }
}
const deletePost = async (id) => {
  try {
    return axios.delete(URL + "/posts/" + id)
  } catch (e) {
    return e
  }
}
const deleteComment = async (id) => {
  try {
    return axios.delete(URL + "/comment/" + id)
  } catch (e) {
    return e
  }
}
const createPost = (postData) => {
  return axios.post(URL + "/posts", postData)
}
const createComment = (postData) => {
  return axios.post(URL + "/comment", postData)
}
const getComments = async (parentPostId) => {
  try {
    const res = await axios.get(URL + "/comments/" + parentPostId)
    const data = res.data
    return data
  } catch (e) {
    return e
  }
}

const signUp = async (name, username, email, password) => {
  try {
    const res = await axios.post(URL + "/signup", {name, username, email, password})
    const data = res.data
    return data
  } catch (e) {
    console.log(e)
  }
}
const login = async (username, password) => {
  try {
    const res = await axios.post(URL + "/login", {username, password})
    const data = res.data
    return data
  } catch (e) {
    return e
  }
}

const getProfile = async (username) => {
  try {
    const res = await axios.get(URL + "/profile/" + username)
    const profileData = await res.data
    return profileData
  } catch (e) {
    console.log(e)
  }
}

const updateProfile = (file) => {
  return axios.patch(URL + "/profile/update", file)
}

const follow = (uname) => {
  return axios.patch(URL + "/follow/" + uname)
}
const unfollow = (uname) => {
  return axios.patch(URL + "/unfollow/" + uname)
}
const followStatus = async (username) => {
  try {
    const res = await axios.get(URL + "/followStatus/" + username)
    const data = res.data
    return data
  } catch (e) {
    return e
  }
}
const isowner = async (username) => {
  try {
    const res = await axios.get(URL + "/isOwner/" + username)
    const data = res.data
    return data
  } catch (e) {
    return e
  }
}
const followingList = async (username) => {
  try {
    const res = await axios.get(URL + "/followingList/" + username)
    const data = res.data
    return data
  } catch (e) {
    return e
  }
}
const followerList = async (username) => {
  try {
    const res = await axios.get(URL + "/followerList/" + username)
    const data = res.data
    return data
  } catch (e) {
    return e
  }
}

module.exports = {
  getPosts,
  getSinglePost,
  deletePost,
  createPost,
  getProfile,
  updateProfile,
  signUp,
  login,
  getRepostsOnPostList,
  getAllUsers,
  myProfile,
  follow,
  unfollow,
  followStatus,
  likePost,
  rePost,
  dislikePost,
  removeRepost,
  likeStatus,
  rePostStatus,
  getSearchResults,
  getNotifications,
  getLikesList,
  isowner,
  postsOfFollowingUsers,
  followerList,
  createComment,
  followingList,
  getReposts,
  getLikedPosts,
  getMediaPosts,
  getComments,
  deleteComment
}
