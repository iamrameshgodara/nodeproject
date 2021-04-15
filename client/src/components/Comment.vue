<template>
  <div class="newPost-container">
    <div class="close-post">
      <button @click="CloseNewPost">X</button>
    </div>
    <div>
      <div class="container">
        <div class="img">
          <!-- <router-link :to="'/' + userName"> -->
          <img :src="'/avatar/' + profilePic" alt="Profile" class="post_dp" />
          <!-- </router-link> -->
        </div>

        <div class="details">
          <div>
            <!-- <router-link :to="'/' + userName"> -->
            <span class="name"> {{ name }} </span>
            <span class="username"> @{{ userName }} </span>
            <!-- </router-link> -->
          </div>

          <div class="full-post-container">
            <!-- <router-link :to="'/' + userName + '/status/' + postId"> -->
            <div class="post-data">
              {{ postData }}
            </div>

            <p v-if="postImg.length > 0">[Post has some images included]</p>

            <!-- </router-link> -->
          </div>
        </div>
      </div>

      <textarea
        v-model="text"
        id=""
        cols="30"
        rows="10"
        placeholder="Post your reply"
        autofocus="autofocus"
      ></textarea>

      <!-- <input type="file" ref="files" @change="selectFile" multiple /> -->
    </div>
    <div class="error" if="errorMessage">
      <p style="color: red">{{ errorMessage }}</p>
    </div>
    <div class="bottom-post-div">
      <button @click="PostCreate" class="new-post-btn">Post</button>
    </div>
  </div>
</template>

<script>
import { createComment, getSinglePost } from "../PostService";
export default {
  data() {
    return {
      postId: "",
      postData: "",
      userName: "",
      profilePic: "",
      postImg: "",
      name: "",
      posts: "",
      text: "",
      files: [],
      uploadFiles: [],
      errorMessage: "",
      newPostBtnOn: false,
      myUserName: "",
    };
  },
  async created() {
    try {
      this.postId = this.$route.params.postId;
      const postData = await getSinglePost(this.postId);
      this.postData = postData.post_data;
      this.userName = postData.owner.username;
      this.profilePic = postData.owner.avatar;
      this.postImg = postData.post_img;
      this.name = postData.owner.name;
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    async PostCreate() {
      if (this.text == "") {
        this.errorMessage = "Write something...";
      }
      try {
        if (!this.errorMessage) {
          createComment({ parentPostId: this.postId, commentText: this.text });
          this.text = "";
          this.newPostBtnOn = false;
          this.$router.go(-1);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async CloseNewPost() {
      this.newPostBtnOn = false;
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.newPost-container {
  /* left: 120%; */
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;
  z-index: 1;
  box-shadow: 1px 1px 12px -5px rgb(48, 47, 47);
  width: 95%;
  margin: 0 auto;
  margin-top: 55px;
  border-radius: 10px;
}

.new-post {
}

.close-post {
  border-bottom: 1px solid rgba(112, 121, 112, 0.517);
  padding: 7px 10px;
  margin-bottom: 15px;
}

.close-post button {
  color: green;
  cursor: pointer;
  font-size: 17px;
  padding: 10px 14px;

  border-radius: 50%;
  border: none;
  background-color: white;
  float: left;
}

.close-post button:hover {
  background-color: rgba(194, 235, 194, 0.404);
}

.newPost-container textarea {
  border: none;
  float: left;
  font-size: 17px;
  margin-left: 10%;
  width: 85%;
  height: 150px;
  resize: none;
  outline: none;
}

.bottom-post-div {
  padding: 10px;
}

.bottom-post-div .new-post-btn {
  float: right;
  margin-right: 10px;
  border: none;
  font-size: 17px;
  padding: 7px 15px;
  color: white;
  border-radius: 9999px;
  cursor: pointer;
  background-color: rgb(56, 160, 56);
}
.container {
  display: flex;
  width: 100%;
  padding: 10px 0;
  /* border-bottom: 1px solid rgb(212, 227, 212); */
  cursor: pointer;
}
button {
  cursor: pointer;
}

.post-data {
  padding-top: 5px;
  font-size: 15px;
  font-weight: 400;
  padding-right: 10px;
  padding-bottom: 20px;
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
.post-data {
  padding-top: 5px;
  font-size: 15px;
  font-weight: 400;
  padding-right: 10px;
  padding-bottom: 20px;
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