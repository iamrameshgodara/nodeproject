<template>
  <div class="profile-container">
    <div class="dp">
      <div>
        <img :src="'/avatar/' + profilePic" alt="profile" />
      </div>

      <div class="profile-buttons">
        <div v-if="amIOwner">
          <router-link :to="'/profile/edit/' + userName" class="edit-profile">
            Edit profile</router-link
          >
        </div>
        <div v-else class="follow-buttons">
          <!-- <router-link
            :to="'/messages/' + 'my_id' + '-' + userName"
            class="message-btn"
            ><i class="fal fa-envelope"></i
          ></router-link> -->
          <div v-if="isFollowing">
            <button @click="unFollow" class="following-btn">Following</button>
          </div>
          <div v-else>
            <button @click="follow" class="follow-btn">Follow</button>
          </div>
        </div>
      </div>
    </div>

    <div class="profile-details">
      <div style="">
        <b>{{ name }} </b>
      </div>
      <div style="color: rgb(91, 112, 131)">@{{ userName }}</div>
      <div style="margin: 13px 0">{{ bio }}</div>
      <div style="margin: 13px 0; color: rgb(91, 112, 131)">
        <i class="fal fa-calendar-alt"></i> Joined {{ createdAt }}
      </div>
      <span class="following">
        <router-link :to="'/' + userName + '/following'"
          ><b>{{ followingCount }}</b> <span>Following</span>
        </router-link>
        <router-link :to="'/' + userName + '/followers'"
          ><b>{{ followerCount }}</b> <span>Followers</span>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
// /Users/rameshgodara/Desktop/NodeJs/nodeproject/client/avatar
// import image from "../../avatar/f6a8fa022a0334296ace8d7380f5deda.png"
export default {
  props: [
    "name",
    "userName",
    "profilePic",
    "bio",

    "followingCount",
    "followerCount",
    "isFollowing",
    "amIOwner",
    "createdAt",
  ],
  data() {
    return {};
  },
  methods: {
    async follow() {
      try {
        // await follow(this.userName)
        this.$emit("is-following", true, this.userName);
      } catch (e) {
        console.log(e);
      }
    },
    async unFollow() {
      try {
        // await unfollow(this.userName)
        this.$emit("is-following", false, this.userName);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style scoped>
.dp img {
  height: 150px;
  width: 150px;
  object-fit: cover;
  border-radius: 50%;
}

.profile-container {
  width: 100%;
  /* border-bottom: 1px solid rgb(212, 227, 212); */
  padding-bottom: 20px;
}
.dp {
  margin: 20px 10px;
  display: flex;
}
.profile-buttons {
  order: 2;
  margin-left: auto;
  margin-top: auto;
  display: flex;
  position: relative;
}
.profile-buttons span {
  /* top: 100px; */
}
.profile-details {
  padding-left: 15px;
}
.following a {
  text-decoration: none;
}
.following a:last-child {
  margin-left: 10px;
}
.following a span {
  color: rgb(91, 112, 131);
}
.following a:hover {
  text-decoration: underline;
}
.follow-btn,
.following-btn,
.edit-profile {
  padding: 10px 12px;
  border-radius: 9999px;
  cursor: pointer;
  border: 1px solid rgb(23, 191, 99);
}
.edit-profile {
  background-color: white;
  color: rgb(23, 191, 99);
}
.follow-btn {
  color: rgb(23, 191, 99);
  background-color: white;
}
.following-btn {
  color: white;
  background-color: rgb(23, 191, 99);
}
.edit-profile:hover,
.follow-btn:hover {
  background-color: rgba(23, 191, 99, 0.1);
}
.follow-buttons {
  display: flex;
}
.follow-buttons div {
  display: inline-block;
  margin: 0 20px;
}
.message-btn {
  position: relative;
  font-size: 25px;
  top: -5px;
  height: 27px;
  width: 27px;
  padding: 10px;
  color: rgb(23, 191, 99);
  border: 1px solid rgb(23, 191, 99);
  border-radius: 50%;
  /* margin-right: 10px; */
}
.message-btn:hover {
  background-color: rgba(23, 191, 99, 0.0456);
}
</style>
