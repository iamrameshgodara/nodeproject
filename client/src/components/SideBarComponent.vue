<template>
  <div class="sidebar-container">
    <nav>
      <ul>
        <li>
          <router-link to="/home"
            ><i class="far fa-home-lg-alt"></i> Home
          </router-link>
        </li>
        <li>
          <router-link to="/notifications"
            ><i class="fal fa-bell"></i> Notifications
          </router-link>
        </li>
        <li>
          <!-- <router-link to="/trending"
            ><i class="fal fa-hashtag"></i> Trending
          </router-link> -->

          <router-link to="/signup"
            ><i class="fal fa-hashtag"></i>Sign up
          </router-link>
        </li>
        <!-- <li>
          <router-link to="/messages"
            ><i class="fal fa-envelope"></i> Messages
          </router-link>
        </li> -->
        <!-- <li>
          <router-link to="/weather"
            ><i class="fal fa-cloud"></i> Weather
          </router-link>
        </li> -->

        <li>
          <a href="http://rameshgodara.store"
            ><i class="fal fa-shopping-bag"></i> Shopping
          </a>
        </li>
        <li>
          <router-link :to="'/' + myUserName"
            ><i class="fal fa-user-alt"></i> Profile
          </router-link>
        </li>
        <li>
          <router-link to="/compose/post" class="new-post">
            New Post
          </router-link>
        </li>
      </ul>

      <!-- <router-link to="/home"><i class="far fa-home-lg-alt"></i>  Home </router-link>
      <router-link to="/trending"><i class="fal fa-hashtag"></i> Trending </router-link>
      <router-link to="/messages"><i class="fal fa-envelope"></i> Messages </router-link>
      <router-link to="/weather"><i class="fal fa-cloud"></i> Weather </router-link>
      <a href="http://rameshgodara.store"><i class="fal fa-shopping-bag"></i> Shopping </a>
      <router-link :to="'/'+myUserName"><i class="fal fa-user-alt"></i> Profile </router-link>
      
      <router-link to='/compose/post' class='new-post'> New Post </router-link> -->
    </nav>
  </div>
</template>

<script>
import { myProfile } from "../PostService";
export default {
  data() {
    return {
      posts: "",
      text: "",
      error: "",

      myUserName: "",
    };
  },
  async created() {
    try {
      const myProfileData = await myProfile();
      this.myUserName = myProfileData.username;
      console.log("a");
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style scoped>
.sidebar-container {
  /* padding: 0; */
  display: inline-block;
}

.newPost-container {
  left: 120%;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;
  z-index: 1;
  width: 550px;
  border-radius: 10px;
}

nav {
  /* display: flex;
    flex-direction: column; */
  /* align-items: center; */
  margin-left: 30px;
}
nav i {
  margin-right: 20px;
}
nav ul {
  list-style: none;
}
nav ul li {
  margin: 7px 0;
  font-size: 19px;
  font-weight: 700;
  padding: 12px 17px;
  text-align: left;
}
nav ul li a {
  padding: 12px 17px;
}
nav ul li a:hover {
  background-color: rgba(194, 235, 194, 0.504);
  border-radius: 9999px;
  padding: 12px 17px;
}

.new-post {
  background-color: rgb(75, 190, 75);
  border-radius: 9999px;
  color: white;
  font-size: 14px;
  padding: 15px 80px;
}
.new-post:hover {
  background-color: rgb(44, 131, 44);
  padding: 15px 80px;
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
  font-size: 19px;
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
</style>