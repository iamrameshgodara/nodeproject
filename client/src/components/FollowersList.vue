<template>
  <top-column>
    <div class="top-name-div">
      <div class="top-header">
        <button @click="$router.go(-1)" class="back-btn">
          <i class="fas fa-arrow-left"></i>
        </button>
        <span>
          <p>
            <b> {{ followers.name }}</b>
          </p>
          <p style="color: rgb(91, 112, 131)">@{{ followers.username }}</p>
        </span>
      </div>
      <div class="top-div">
        <router-link :to="'/' + paramUsername + '/followers'" class="active">
          Followers</router-link
        >
        <router-link :to="'/' + paramUsername + '/following'"
          >Following</router-link
        >
      </div>
    </div>
  </top-column>

  <user-item
    v-for="follower in followers.followerList"
    :key="follower._id"
    :name="follower.name"
    :user-name="follower.username"
    :bio="follower.bio"
    :profile-pic="follower.avatar"
  >
  </user-item>
</template>

<script>
import { followerList } from "../PostService";

export default {
  data() {
    return {
      profileData: "",
      followers: "",
      paramUsername: "",
    };
  },
  async created() {
    this.paramUsername = this.$route.params.username;
    try {
      this.followers = await followerList(this.paramUsername);
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
<style scoped>
.top-column {
  height: 110px;
}
.top-name-div {
  width: 100%;
  height: 50px;
}
.top-div {
  position: sticky;
  top: 58px;
  height: 60px;
  display: flex;
}
a {
  display: inline-block;
  width: 50%;
  height: 73%;
  text-align: center;
  padding-top: 13px;
}
a:hover {
  background-color: rgba(0, 0, 255, 0.077);
}
.active {
  border-bottom: 2px solid blue;
  color: rgb(56, 56, 236);
}
</style>