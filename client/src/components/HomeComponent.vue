<template>
  <top-column>
    <h3>Home</h3>
  </top-column>
  <!-- <div class="newPost-container">
    <div>
      <textarea
        v-model="text"
        cols="30"
        rows="10"
        placeholder="Wanna post something ?"
        autofocus="autofocus"
      ></textarea>
    </div>
    <div class="bottom-post-div">
      <span v-if="text.length > 0">{{ text.length }}/240</span>
      <button @click="PostCreate(text)" class="new-post-btn">Post</button>
    </div>
  </div> -->
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
    @toggle-like="toggleLike"
  >
  </post-component>
</template>

<script>
import { createPost, postsOfFollowingUsers } from "../PostService";
export default {
  data() {
    return {
      posts: "",
      profilePic: "",
      text: "",
    };
  },
  async created() {
    await this.loadPosts();
  },

  methods: {
    async toggleLike() {
      try {
        await this.loadPosts();
      } catch (e) {
        console.log(e);
      }
    },
    async loadPosts() {
      try {
        this.posts = await postsOfFollowingUsers();
      } catch (e) {
        console.log(e);
      }
    },
    async PostCreate(text) {
      try {
        await createPost(text);
        this.text = "";
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
/* .top-column h3 {
  padding-left: 15px;
  padding-top: 15px;
} */
.newPost-container {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;
  z-index: 1;
  border-right: 1px solid rgb(212, 227, 212);
}
.newPost-container:after {
  height: 10px;
  content: "";
  display: block;
  width: 100%;
  background: rgba(241, 240, 240, 0.301);
}
.newPost-container textarea {
  border: none;
  float: left;
  font-size: 17px;
  /* margin-left: 10%; */
  padding: 10px;
  width: 85%;
  height: 50px;
  resize: none;
  outline: none;
}

.bottom-post-div {
  padding: 10px;
  text-align: right;
}

.bottom-post-div .new-post-btn {
  margin-left: 20px;
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
</style>