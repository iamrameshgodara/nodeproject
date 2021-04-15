<template>
  <top-column>
    <div class="top-name-div">
      <div class="top-header">
        <button @click="$router.go(-1)" class="back-btn">
          <i class="fas fa-arrow-left"></i>
        </button>
        <span>
          <p>
            <b> {{ followings.name }}</b>
          </p>
          <p style="color: rgb(91, 112, 131)">@{{ followings.username }}</p>
        </span>
      </div>
      <div class="top-div">
        <router-link :to="'/' + paramUsername + '/followers'">
          Followers</router-link
        >
        <router-link :to="'/' + paramUsername + '/following'" class="active"
          >Following</router-link
        >
      </div>
    </div>
  </top-column>

  <user-item
    v-for="following in followings.followingList"
    :key="following._id"
    :name="following.name"
    :user-name="following.username"
    :bio="following.bio"
    :profile-pic="following.avatar"
  >
  </user-item>
</template>

<script>
import { followingList } from "../PostService";

export default {
  data() {
    return {
      profileData: "",
      followings: "",
      paramUsername: "",
    };
  },
  async created() {
    this.paramUsername = this.$route.params.username;
    try {
      this.followings = await followingList(this.paramUsername);
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