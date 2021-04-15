<template>
  <div class="container">
    <div class="img">
      <router-link :to="'/' + userName">
        <img :src="'/avatar/' + profilePic" alt="Profile" class="post_dp" />
      </router-link>
    </div>

    <div class="details">
      <div>
        <router-link :to="'/' + userName">
          <span class="name"> {{ name }} </span>
          <span class="username"> @{{ userName }} .</span>
          <span class="username"> {{ time }} </span>
        </router-link>
        <button v-if="isOwner" @click="deletePost(postId)" class="delete-btn">
          delete
        </button>
      </div>

      <div class="full-post-container">
        <router-link :to="'/' + userName + '/status/' + postId">
          <div class="post-data">
            {{ postData }}
          </div>
        </router-link>
        <div class="post-images" v-if="postImg.length > 0">
          <div class="single-image-box" v-if="postImg.length == 1">
            <div v-for="(img, index) in postImg" :key="img" class="post_img">
              <video
                v-if="img.endsWith('.mp4')"
                class="post-video"
                :src="'/postImg/' + img"
                controls
              ></video>
              <router-link
                v-else
                :to="'/' + userName + '/status/' + postId + '/photo/' + index"
              >
                <img :src="'/postImg/' + img" />
              </router-link>
            </div>
          </div>
          <div class="double-image-box" v-if="postImg.length == 2">
            <div v-for="(img, index) in postImg" :key="img" class="post_img_2">
              <router-link
                :to="'/' + userName + '/status/' + postId + '/photo/' + index"
              >
                <img :src="'/postImg/' + img" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="post-buttons">
        <!-- <button class="reply-btn"><i class="fal fa-comment"></i></button> -->
        <router-link
          :to="'/' + userName + '/status/' + postId + '/comment'"
          class="reply-btn"
        >
          <i class="fal fa-comment"></i>
        </router-link>
        <button class="retweet-btn" @click="toggleRepost">
          <i class="fal fa-retweet" v-if="isReposted" style="color: green"></i>
          <i class="fal fa-retweet" v-else></i>
          <span v-if="rePosts.length > 0" style="margin-left: 3px">
            {{ rePosts.length }}
          </span>
        </button>
        <button class="like-btn" @click="toggleLike">
          <i class="fas fa-heart" style="color: red" v-if="isLiked"></i>
          <i class="fal fa-heart" v-else></i>
          <span v-if="postLikes.length > 0" style="margin-left: 3px">
            {{ postLikes.length }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  deletePost,
  likeStatus,
  likePost,
  dislikePost,
  rePost,
  rePostStatus,
  removeRepost,
  isowner,
} from "../PostService";
export default {
  props: [
    "name",
    "userName",
    "postData",
    "createdAt",
    "postId",
    "postLikes",
    "rePosts",
    "profilePic",

    "postImg",
  ],
  data() {
    return {
      isLiked: false,
      time: "0s",
      isReposted: false,
      isOwner: false,
    };
  },

  async created() {
    try {
      this.postTime();
      const isLiked = await likeStatus(this.postId);
      if (isLiked) {
        this.isLiked = true;
      } else if (!isLiked) {
        this.isLiked = false;
      }
      this.isOwner = await isowner(this.userName);
      const isReposted = await rePostStatus(this.postId);
      if (isReposted) {
        this.isReposted = true;
      } else if (!isReposted) {
        this.isReposted = false;
      }
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    postTime() {
      const createdTime = new Date(this.createdAt);
      const currentTime = new Date();
      let seconds = (currentTime - createdTime) / 1000;
      seconds = Math.round(seconds);
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      if (seconds < 60) {
        this.time = seconds + "s";
      } else if (seconds < 60 * 60) {
        this.time = Math.round(seconds / 60) + "m";
      } else if (seconds < 60 * 60 * 24) {
        this.time = Math.round(seconds / (60 * 60)) + "h";
      } else if (createdTime.getFullYear() == currentTime.getFullYear()) {
        this.time =
          months[createdTime.getMonth()] + " " + createdTime.getDate();
      } else {
        this.time =
          months[createdTime.getMonth()] +
          " " +
          createdTime.getDate() +
          ", " +
          createdTime.getFullYear();
      }
      // this.time=currentTime.getHours()+":"+currentTime.getMinutes()+":"+currentTime.getSeconds()
    },
    deletePost(id) {
      deletePost(id);
      this.$emit("post-data-changed");
    },
    async toggleRepost() {
      try {
        if (this.isReposted) {
          await removeRepost(this.postId);
          this.isReposted = false;
        } else {
          await rePost(this.postId);
          this.isReposted = true;
        }
        this.$emit("toggle-like"); //this emited event will refresh the post
      } catch (e) {
        console.log(e);
      }
    },
    async toggleLike() {
      try {
        if (this.isLiked) {
          await dislikePost(this.postId);
          this.isLiked = false;
        } else {
          await likePost(this.postId);
          this.isLiked = true;
        }
        this.$emit("toggle-like");
        console.log("toggle like");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}

ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

li {
  margin: 10px 5px;
  margin-bottom: 0;
}
.post_dp {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  padding: 5px 10px;
  display: inline-block;
  /* object-fit: cover; */
}
.full-post-container {
  /* background: gainsboro; */
  padding-top: 5px;
  font-size: 15px;
  font-weight: 400;
  padding-right: 10px;
  width: 95%;
  display: inline-block;
  overflow: hidden;
}
.post-images {
  /* margin-top: 20px; */
  border-radius: 15px;
  margin-bottom: 5px;
  overflow: hidden;
  width: 100%;
  max-height: 300px;
  display: inline-block;
}
.post-video {
  width: 100%;
  margin: auto;
  display: block;
  max-height: 300px;
}
.single-image-box {
  width: 100%;
}

.double-image-box {
  display: flex;
}
/* .three-image-box:first-child {
  height: 100px;
  border: 2px solid black;
} */

.post_img img {
  object-fit: cover;
  width: 100%;
  max-height: 300px;
}
.post_img_2 {
  width: 49.7%;
  height: 300px;
  object-fit: cover;
}
.post_img_2:first-child {
  margin-right: auto;
}
.post_img_2 img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.container {
  display: flex;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid rgb(212, 227, 212);
  cursor: pointer;
}
button {
  cursor: pointer;
}
.container:hover {
  background-color: rgba(8, 8, 247, 0.043);
}
.container:last-child {
  border-bottom: none;
}
.post-data {
  padding-top: 5px;
  font-size: 15px;
  font-weight: 400;
  padding-right: 10px;
  padding-bottom: 20px;
}

.post-buttons {
  /* padding-top: 5px; */
}
.reply-btn,
.retweet-btn,
.like-btn {
  background: transparent;
  border: none;
  font-size: 15px;
}
.reply-btn {
  margin-left: 20px;
}
.retweet-btn {
  margin-left: 30%;
}
.like-btn {
  margin-left: 25%;
}
.delete-btn {
  padding: 2px 5px;
  background: transparent;
  border: none;
  box-shadow: 2px 2px 10px -6px gray, -2px -2px 10px -6px gray;
  float: right;
  border-radius: 5px;
  margin-right: 25px;
}
.details {
  padding-right: 10px;
  /* background: tomato; */
  padding: 5px 0;
  width: 90%;
}

.name {
  color: inherit;
  font-weight: bold;
  font-size: 15px;
}
.username {
  font-size: 15px;
  color: rgb(91, 112, 131);
  margin-right: 5px;
}
</style>