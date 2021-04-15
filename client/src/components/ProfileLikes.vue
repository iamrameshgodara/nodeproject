<template>
  <top-column>
    <div class="top-header">
      <button @click="$router.go(-1)" class="back-btn">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h3>{{ profileData.name }}</h3>
    </div>
  </top-column>
  <div class="profile-container-top">
    <profile-content
      :name="profileData.name"
      :user-name="profileData.username"
      :profile-pic="profileData.avatar"
      :bio="profileData.bio"
      :created-at="JoinedAt"
      :following-count="profileData.following"
      :follower-count="profileData.followers"
      :is-following="isFollowing"
      :am-i-owner="amIOwner"
      @is-following="toggleFollow"
    >
    </profile-content>
    <div class="post-types">
      <router-link :to="'/' + username">Posts</router-link>
      <router-link :to="'/' + username + '/reposts'">Reposts</router-link>
      <router-link :to="'/' + username + '/media'">Media</router-link>
      <router-link :to="'/' + username + '/likes'" class="post-type-active"
        >Likes</router-link
      >
    </div>
  </div>
  <post-component
    v-for="post in posts"
    :key="post._id"
    :name="post.owner.name"
    :user-name="post.owner.username"
    :post-data="post.post_data"
    :post-img="post.post_img"
    :created-at="post.createdAt"
    :post-id="post._id"
    :post-likes="post.likes"
    :re-posts="post.reposts"
    :profile-pic="post.owner.avatar"
    @post-data-changed="loadPostsAgain"
    @toggle-like="toggleLike"
  >
  </post-component>

  <div
    v-if="posts.length <= 0"
    style="margin-top: 30px; text-align: center; font-size: 14px"
  >
    <h2>@{{ username }} hasn't liked any post.</h2>
  </div>
</template>

<script>
// import axios from "axios";
import {
  follow,
  unfollow,
  followStatus,
  getProfile,
  getLikedPosts,
  deletePost,
  isowner,
} from "../PostService";
import ProfileContent from "./ProfileContent.vue";
export default {
  name: "ProfileComponent",
  components: {
    ProfileContent,
  },
  data() {
    return {
      profileData: "",
      JoinedAt: "",
      posts: "",
      isFollowing: false,
      amIOwner: false,
      username: "",
    };
  },
  watch: {
    $route(newRoute) {
      this.loadProfile(newRoute);
    },
  },
  async created() {
    this.loadProfile(this.$route);
  },
  methods: {
    async toggleLike() {
      try {
        await this.loadPostsAgain();
      } catch (e) {
        console.log(e);
      }
    },
    async loadProfile(route) {
      try {
        console.log("LoadProfile");
        this.username = route.params.username;
        const username = route.params.username;
        this.profileData = await getProfile(username);
        let date = new Date(this.profileData.createdAt);
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        this.JoinedAt = months[date.getMonth()] + " " + date.getFullYear();
        const isfollowing = await followStatus(this.profileData.username);
        if (isfollowing) {
          this.isFollowing = true;
        } else {
          this.isFollowing = false;
        }
        if (await isowner(username)) {
          this.amIOwner = true;
        } else {
          this.amIOwner = false;
        }
        this.posts = await getLikedPosts(username);
      } catch (e) {
        console.log(e);
      }
    },
    async loadPostsAgain() {
      this.loadProfile(this.$route);
    },
    async postDelete(id) {
      deletePost(id);
      this.posts = await getLikedPosts(this.profileData._id);
    },
    async toggleFollow(isFavouriteEventValue, username) {
      try {
        this.isFollowing = isFavouriteEventValue;
        if (isFavouriteEventValue) {
          await follow(username);
        } else {
          await unfollow(username);
        }

        this.profileData = await getProfile(username);
        this.followingCount = this.profileData.following.length;
        this.followerCount = this.profileData.followers.length;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
.top-header button {
  margin-top: -2px;
}
.profile-container-top {
  border-bottom: 1px solid rgb(212, 227, 212);
}
.post-types {
  /* padding: 15px; */
  display: flex;
  /* height: 40px; */
}
.post-types a {
  display: block;
  margin: auto;
  height: 100%;
  padding: 15px;
  text-align: center;
  width: 25%;
  /* background: chocolate; */
}
.post-types a:hover {
  /* background: rgb(247, 249, 250); */
  background-color: rgba(8, 8, 247, 0.043);
  color: rgb(75, 190, 75);
}
</style>