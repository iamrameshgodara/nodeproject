<template>
  <top-column>
    <div class="top-header">
      <button @click="$router.go(-1)" class="back-btn">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h3>Liked by</h3>
    </div>
  </top-column>
  <!-- {{ likesList }} -->
  <user-item
    v-for="like in likesList"
    :key="like._id"
    :name="like.name"
    :user-name="like.username"
    :bio="like.bio"
    :profile-pic="like.avatar"
  >
  </user-item>

  <div
    v-if="likesList.length <= 0"
    style="margin-top: 50px; width: 100%; text-align: center"
  >
    <p>No items</p>
  </div>
</template>

<script>
import { getLikesList } from "../PostService";
export default {
  data() {
    return {
      likesList: [],
    };
  },
  async created() {
    const postId = this.$route.params.postId;
    try {
      this.likesList = await getLikesList(postId);
    } catch (e) {
      console.log(e);
    }
  },
};
</script>