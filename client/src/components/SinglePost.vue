<template>
  <!-- <a @click='$router.go(-1)' class=back-button> Back</a> -->

  <top-column>
    <div class="top-header">
      <button @click="$router.go(-1)" class="back-btn">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h3>Post</h3>
    </div>
  </top-column>

  <div class="container">
    <router-link :to="'/' + userName">
      <ul class="main-list">
        <li>
          <img :src="'/avatar/' + profilePic" alt="" class="avatar" />
        </li>
        <li>
          <ul class="name-username-list">
            <li class="underline-on-hover">
              <b>{{ name }}</b>
            </li>
            <li>@{{ userName }}</li>
          </ul>
        </li>
      </ul>
    </router-link>

    <div class="post-data">
      <div>
        {{ postData }}
      </div>
      <div class="post-images" v-if="postImg.length > 0">
        <div class="single-image-box" v-if="postImg.length == 1">
          <div v-for="(img, index) in postImg" :key="img" class="post_img">
            <video
              v-if="img.endsWith('.mp4')"
              style="width: 100%"
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

      <div class="time">
        <p>{{ time }}</p>
      </div>
    </div>

    <div class="like-count" v-if="likes.length > 0 || reposts.length > 0">
      <span v-if="reposts.length > 0">
        <router-link
          :to="'/' + userName + '/status/' + postId + '/reposts'"
          class="underline-on-hover"
        >
          <p>
            <b style="color: black">{{ reposts.length }}</b> Reposts
          </p>
        </router-link>
      </span>

      <span v-if="likes.length > 0">
        <router-link
          :to="'/' + userName + '/status/' + postId + '/likes'"
          class="underline-on-hover"
        >
          <p>
            <b style="color: black"> {{ likes.length }}</b> Likes
          </p>
        </router-link>
      </span>
    </div>

    <div class="post-buttons">
      <router-link
        :to="'/' + userName + '/status/' + postId + '/comment'"
        class="reply-btn"
      >
        <i class="fal fa-comment"></i>
      </router-link>
      <!-- <button class="reply-btn"><i class="fal fa-comment"></i></button> -->
      <button class="retweet-btn" @click="toggleRepost">
        <i class="fal fa-retweet" v-if="isReposted" style="color: green"></i>
        <i class="fal fa-retweet" v-else></i>
      </button>
      <button class="like-btn" @click="toggleLike">
        <i class="fas fa-heart" v-if="isLiked" style="color: red"></i>
        <i class="fal fa-heart" v-else></i>
      </button>
    </div>
  </div>

  <comment-item
    v-for="comment in comments"
    :key="comment._id"
    :comment-id="comment._id"
    :name="comment.owner.name"
    :user-name="comment.owner.username"
    :profile-pic="comment.owner.avatar"
    :created-at="comment.createdAt"
    :detail="comment.detail"
    @post-data-changed="loadPost"
  >
  </comment-item>
</template>

<script>
import {
  getSinglePost,
  likePost,
  dislikePost,
  likeStatus,
  removeRepost,
  rePost,
  rePostStatus,
  getComments,
} from "../PostService";
export default {
  data() {
    return {
      postData: "",
      src: "",
      postImg: [],
      userName: "",
      name: "",
      likes: "",
      reposts: "",
      isLiked: false,
      isReposted: false,
      time: "",
      profilePic: "",
      postId: "",
      comments: [],
    };
  },
  async created() {
    try {
      await this.loadPost();
    } catch (E) {
      console.log(E);
    }
  },
  methods: {
    async loadPost() {
      try {
        this.postId = this.$route.params.postId;
        const postData = await getSinglePost(this.postId);
        this.postData = postData.post_data;
        this.userName = postData.owner.username;
        this.profilePic = postData.owner.avatar;
        this.postImg = postData.post_img;
        this.name = postData.owner.name;
        this.likes = postData.likes;
        this.reposts = postData.reposts;
        this.comments = await getComments(this.postId);
        const isLiked = await likeStatus(this.postId);
        if (isLiked) {
          this.isLiked = true;
        } else if (!isLiked) {
          this.isLiked = false;
        }
        const isReposted = await rePostStatus(this.postId);
        if (isReposted) {
          this.isReposted = true;
        } else if (!isReposted) {
          this.isReposted = false;
        }
        const createdAt = postData.createdAt;
        const date = new Date(createdAt);
        const arr = [
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

        if (date.getHours() > 12) {
          this.time =
            date.getHours() -
            12 +
            ":" +
            date.getMinutes() +
            " PM" +
            " . " +
            arr[date.getMonth()] +
            " " +
            date.getDate() +
            ", " +
            date.getFullYear();
        } else {
          this.time =
            date.getHours() +
            ":" +
            date.getMinutes() +
            "AM" +
            " . " +
            arr[date.getMonth()] +
            " " +
            date.getDate() +
            ", " +
            date.getFullYear();
        }
      } catch (e) {
        console.log(e);
      }
    },
    async toggleRepost() {
      try {
        if (this.isReposted) {
          await removeRepost(this.$route.params.postId);
          await this.loadPost();
        } else {
          await rePost(this.$route.params.postId);
          await this.loadPost();
        }
      } catch (e) {
        console.log(e);
      }
    },
    async toggleLike() {
      try {
        if (this.isLiked) {
          await dislikePost(this.$route.params.postId);
          await this.loadPost();
        } else {
          await likePost(this.$route.params.postId);
          await this.loadPost();
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style scoped>
.container {
  padding: 0 15px;
  border-bottom: 1px solid rgb(212, 227, 212);
}
.time {
  margin: 10px 0;
  padding: 5px 0;
}
.like-count {
  margin: 10px 0;
  padding: 15px;
  border-top: 1px solid rgb(212, 227, 212);
  /* border-bottom: 1px solid rgb(212, 227, 212); */
  margin-bottom: 0;

  display: flex;
}
.like-count span {
  margin-right: 20px;
  display: block;
}
.post-buttons {
  padding: 20px;
  border-top: 1px solid rgb(212, 227, 212);
}
.like-btn,
.retweet-btn,
.reply-btn {
  font-weight: 400;
  background: white;
  border: none;
  font-size: 17px;
  cursor: pointer;
}
.like-btn {
  margin-left: 25%;
}

.retweet-btn {
  margin-left: 20%;
}
.reply-btn {
  margin-left: 10%;
}

a {
  text-decoration: none;
  color: inherit;
}

.avatar {
  height: 57px;
  width: 57px;
  border-radius: 50%;
  object-fit: cover;
}

ul {
  list-style-type: none;
  padding: 5px;
}

.main-list {
  display: flex;
}

.name-username-list {
  padding: 0;
  padding-left: 10px;
}

.name-username-list li {
  font-size: 17px;
}

.post-data {
  font-size: 22px;
}

p {
  color: rgb(99, 97, 97);
  font-weight: 400;
  font-size: 17px;
}

.top-div-single-post {
  display: flex;
  padding-top: 10px;
}
.post-images {
  margin-top: 20px;
  border-radius: 15px;
  margin-bottom: 0;
  overflow: hidden;
  width: 100%;
  max-height: 340px;
  display: inline-block;
  /* background: lightcoral; */
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
  max-height: 320px;
}
.post_img_2 {
  width: 49.7%;
  height: 320px;
  object-fit: cover;
}
.post_img_2:first-child {
  margin-right: auto;
}
.post_img_2 img {
  width: 100%;
  height: 320px;
  object-fit: cover;
}
</style>