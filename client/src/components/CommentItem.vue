<template>
  <div class="container">
    <div class="img">
      <!-- <router-link :to="'/' + userName"> -->
      <img :src="'/avatar/' + profilePic" alt="Profile" class="post_dp" />
      <!-- </router-link> -->
    </div>

    <div class="details">
      <div>
        <router-link :to="'/' + userName">
          <span class="name"> {{ name }} </span>
          <span class="username"> @{{ userName }} .</span>
          <span class="username"> {{ time }} </span>
          <!-- <button @click="deleteComment">Del</button> -->
        </router-link>
        <button v-if="isOwner" @click="deleteComment" class="delete-btn">
          delete
        </button>
      </div>

      <div class="full-post-container">
        <!-- <router-link :to="'/' + userName + '/status/' + postId"> -->
        <div class="post-data">
          {{ detail }}
        </div>
        <!-- </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
import { deleteComment, isowner } from "../PostService";
export default {
  props: ["name", "userName", "profilePic", "detail", "createdAt", "commentId"],
  data() {
    return {
      time: "0s",
      isOwner: false,
    };
  },
  methods: {
    async deleteComment() {
      try {
        await deleteComment(this.commentId);
        this.$emit("post-data-changed");
      } catch (e) {
        console.log(e);
      }
    },
  },
  async created() {
    try {
      const createdTime = new Date(this.createdAt);
      const currentTime = new Date();
      let seconds = (currentTime - createdTime) / 1000;
      seconds = Math.round(seconds);
      this.isOwner = await isowner(this.userName);
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
    } catch (e) {
      console.log(e);
    }
  },
};
</script>


<style scoped>
img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
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
.delete-btn {
  padding: 2px 5px;
  background: transparent;
  border: none;
  box-shadow: 2px 2px 10px -6px gray, -2px -2px 10px -6px gray;
  float: right;
  border-radius: 5px;
  margin-right: 25px;
}
</style>