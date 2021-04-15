<template>
  <div class="main-div">
    <router-link :to="'/' + userName">
      <div class="container">
        <div class="profilePic">
          <img :src="'/avatar/' + profilePic" alt="Profile" />
        </div>
        <div class="details">
          <span class="name"> {{ name }} </span>
          <span class="username"> @{{ userName }} </span>

          <div class="post-data">
            {{ bio }}
          </div>
        </div>
      </div>
    </router-link>
    <div class="profile-buttons">
      <div v-if="!amIOwner" class="follow-buttons">
        <div v-if="isFollowing">
          <button @click="unFollow" class="following-btn">Following</button>
        </div>
        <div v-else>
          <button @click="follow" class="follow-btn">Follow</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  follow,
  unfollow,
  followStatus,
  // myProfile,
  isowner,
} from "../PostService";
export default {
  props: ["id", "name", "userName", "bio", "profilePic"],
  data() {
    return {
      isFollowing: false,
      amIOwner: false,
    };
  },
  async created() {
    const isfollowing = await followStatus(this.userName);
    if (isfollowing) {
      this.isFollowing = true;
    } else if (!isfollowing) {
      this.isFollowing = false;
    }
    try {
      if (await isowner(this.userName)) {
        this.amIOwner = true;
      } else {
        this.amIOwner = false;
      }
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    async follow() {
      try {
        await follow(this.userName);
        // this.$emit("is-following", true, this.userName);
        this.isFollowing = true;
      } catch (e) {
        console.log(e);
      }
    },
    async unFollow() {
      try {
        await unfollow(this.userName);
        this.isFollowing = false;
        // this.$emit("is-following", false, this.userName);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style  scoped>
a {
  text-decoration: none;
}

img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
.main-div {
  border-bottom: 1px solid rgb(212, 227, 212);
  display: flex;
  /* background: chocolate; */
  min-height: 85px;
}

.container {
  display: flex;
  width: 100%;
  padding: 10px 0;
  /* border-bottom: 1px solid rgb(212, 227, 212); */
}
.container:last-child {
  border-bottom: none;
}
.post-data {
  padding-top: 5px;
  font-size: 15px;
  font-weight: 400;
  padding-right: 10px;
}
.profilePic {
  height: 20px;
  width: 20px;
  margin-left: 15px;
  margin-right: 40px;
  object-fit: cover;
}
.details {
  padding-right: 10px;
  padding: 5px 0;
  width: 90%;
}
.details button {
  position: absolute;
  margin-left: 15%;
}
.name {
  color: inherit;
  font-weight: bold;
  font-size: 15px;
}
.username {
  font-size: 15px;
  color: rgb(91, 112, 131);
}
.profile-buttons {
  position: relative;
  padding: 0;
  margin: auto;
  margin-right: 20px;
  order: 2;
}

.follow-btn,
.following-btn {
  padding: 10px 12px;
  border-radius: 9999px;
  cursor: pointer;
  font-size: 14px;
  border: 1px solid rgb(23, 191, 99);
}

.follow-btn {
  color: rgb(23, 191, 99);
  background-color: white;
}
.following-btn {
  color: white;
  background-color: rgb(23, 191, 99);
}

.follow-btn:hover {
  background-color: rgba(23, 191, 99, 0.1);
}
</style>>

