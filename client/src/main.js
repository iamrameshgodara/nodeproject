import {createApp} from "vue"
import App from "./App.vue"
import {createRouter, createWebHistory} from "vue-router"

import TopColumn from "./components/TopColumn"

import Profile from "./components/ProfileComponent"
import EditProfileComponent from "./components/EditProfileComponent"
import SignUpComponent from "./components/SignUpComponent"
import FollowSugg from "./components/FollowSugg"
import FollowingList from "./components/FollowingList"
import FollowersList from "./components/FollowersList"
import HomeComponent from "./components/HomeComponent"
import SinglePost from "./components/SinglePost"
import ComposePost from "./components/ComposePost"
import Messages from "./components/Messages"
import WeatherComp from "./components/WeatherComp"
import SearchPage from "./components/SearchPage"
import PostComponent from "./components/PostComponent"
import UserItem from "./components/UserItem"
import ImageView from "./components/ImageView"
import Notifications from "./components/Notifications"
import LikesList from "./components/LikesList"
import RepostsList from "./components/RepostsList"
import ProfileReposts from "./components/ProfileReposts"
import ProfileMedia from "./components/ProfileMedia"
import ProfileLikes from "./components/ProfileLikes"
import Comment from "./components/Comment"
import CommentItem from "./components/CommentItem"
import LoginComp from "./components/LoginComp"
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: "/home", component: HomeComponent},
    {path: "/", redirect: "/home"},
    {path: "/compose/post", component: ComposePost},
    {path: "/messages", component: Messages},
    {path: "/:username/followers", component: FollowersList},
    {path: "/profile/edit/:username", component: EditProfileComponent},
    {path: "/signup", component: SignUpComponent},
    {path: "/users", component: FollowSugg},
    {path: "/weather", component: WeatherComp},
    {path: "/search", component: SearchPage},
    {path: "/notifications", component: Notifications},
    {path: "/login", component: LoginComp},
    {path: "/:username", component: Profile},
    {path: "/:username/reposts", component: ProfileReposts},
    {path: "/:username/media", component: ProfileMedia},
    {path: "/:username/likes", component: ProfileLikes},
    {path: "/:username/following", component: FollowingList},
    {path: "/:username/status/:postId", component: SinglePost},
    {path: "/:username/status/:postId/comment", component: Comment},
    {path: "/:username/status/:postId/likes", component: LikesList},
    {path: "/:username/status/:postId/reposts", component: RepostsList},
    {path: "/:username/status/:postId/photo/:photoNumber", component: ImageView}
    // {path: "/:notFound(.*)", redirect: "/home"}
  ],
  linkActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return {x: 0, y: 0}
  }
})
const app = createApp(App)
app.use(router)
app.component("top-column", TopColumn)
app.component("comment-item", CommentItem)
app.component("post-component", PostComponent)
app.component("user-item", UserItem)
app.mount("#app")
