<template>
  <div class="top-column">
    <!-- {{ me }} -->
    <div class="detail">
      <span class="profile-logo">
        <router-link :to="'/' + me.username">
          <img :src="'/avatar/' + me.avatar" alt="dp" />
        </router-link> </span
      ><slot> </slot>
    </div>
  </div>
</template>

<script>
import { myProfile } from "../PostService";
export default {
  data() {
    return {
      me: [],
    };
  },
  async created() {
    try {
      this.me = await myProfile();
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style scoped>
.top-column {
  height: 50px;
  position: sticky;
  top: 0;
  border-bottom: 1px solid rgb(212, 227, 212);
  z-index: 2;
}
.detail {
  color: black;
  display: flex;
  padding-left: 15px;
  padding-top: 15px;
}
.profile-logo {
  display: none;
}
@media only screen and (max-width: 600px) {
  .profile-logo {
    margin-right: 22px;
    display: block;
  }
  .profile-logo img {
    height: 35px;
    width: 35px;
    border-radius: 50%;
    margin-top: -4px;
  }
}
</style>>

