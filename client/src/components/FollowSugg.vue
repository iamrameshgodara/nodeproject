<template>
  <div class="follow-who-container" v-if="users.length > 0">
    <div style="border-bottom: 1px solid rgb(212, 227, 212); padding: 15px">
      <h3>Who to follow</h3>
    </div>
    <user-item
      class="userItem"
      v-for="user in users"
      :key="user.username"
      :name="user.name"
      :id="user._id"
      :user-name="user.username"
      :profile-pic="user.avatar"
    >
    </user-item>
  </div>
</template>

<script>
import { getAllUsers } from "../PostService";
import UserItem from "./UserItem.vue";
export default {
  components: { UserItem },

  data() {
    return {
      users: "",
    };
  },
  async created() {
    try {
      this.users = await getAllUsers();
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
<style scoped>
.follow-who-container {
  background: rgb(247, 249, 250);
  width: 80%;
  margin: 0 auto;
  font-size: 17px;
  text-align: left;
  padding: 0;
  border-radius: 15px;
  margin-top: 15px;
  overflow: hidden;
}
</style>