<template>
  <top-column>
    <div class="top-header">
      <button @click="$router.go(-1)" class="back-btn">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h3>Reposted by</h3>
    </div>
  </top-column>
  <user-item
    v-for="like in repostsList"
    :key="like._id"
    :name="like.name"
    :user-name="like.username"
    :bio="like.bio"
    :profile-pic="like.avatar"
  >
  </user-item>
</template>

<script>
import { getRepostsOnPostList } from "../PostService";
export default {
  data() {
    return {
      repostsList: [],
    };
  },
  async created() {
    const postId = this.$route.params.postId;
    try {
      this.repostsList = await getRepostsOnPostList(postId);
    } catch (e) {
      console.log(e);
    }
  },
};
</script>