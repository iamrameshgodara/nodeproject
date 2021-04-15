<template>
  <top-column>
    <div class="top-header-search">
      <form @submit.prevent="submitSearchForm" class="searchBar">
        <i class="fal fa-search"></i>
        <input type="text" v-model="searchText" placeholder="Search..." />
      </form>

      <!-- {{ posts }} -->
      <div class="searchType" v-if="q">
        <router-link :to="`/search?q=${q}`"> Top </router-link>
        <router-link :to="`/search?q=${q}&f=user`"> Users </router-link>
      </div>
    </div>
  </top-column>
  <div v-if="!isUser">
    <post-component
      v-for="post in posts"
      :key="post._id"
      :name="post.owner.name"
      :user-name="post.owner.username"
      :profile-pic="post.owner.avatar"
      :post-data="post.post_data"
      :post-img="post.post_img"
      :created-at="post.createdAt"
      :post-id="post._id"
      :post-likes="post.likes"
      :re-posts="post.reposts"
      :am-i-owner="false"
      @toggle-like="toggleLike"
      @post-data-changed="toggleLike"
    >
    </post-component>
  </div>
  <div v-else>
    <user-item
      v-for="post in posts"
      :key="post._id"
      :name="post.name"
      :user-name="post.username"
      :bio="post.bio"
      :profile-pic="post.avatar"
    >
    </user-item>
  </div>
  <!-- <div v-for='post in posts'
:key='post._id'
>
{{post.owner.bio}} 

<br><br><br><br>
</div> -->
</template>


<script>
import { getSearchResults } from "../PostService";

export default {
  data() {
    return {
      q: "",
      f: "",
      posts: "",
      isUser: false,
      searchText: "",
    };
  },
  watch: {
    async $route(NewRoute) {
      try {
        console.log("Router changed");
        await this.loadPage(NewRoute);
      } catch (e) {
        console.log(e);
      }
    },
  },
  async created() {
    try {
      await this.loadPage(this.$route);
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    async submitSearchForm() {
      try {
        if (this.searchText) this.$router.push("/search?q=" + this.searchText);
        await this.loadPage(this.$route);
      } catch (e) {
        console.log(e);
      }
    },
    toggleLike() {
      console.log("toggleLike");
    },
    async loadPage(route) {
      try {
        this.q = route.query.q;
        this.f = route.query.f;
        this.searchText = this.q;
        console.log("query" + this.q);
        console.log("fetch" + this.f);
        if (this.q && !this.f) {
          this.isUser = false;
          this.posts = await getSearchResults(this.q);
        } else if (this.f && this.f == "user") {
          this.isUser = true;
          this.posts = await getSearchResults(this.q + "&f=user");
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
.top-column {
  height: auto;
}
.top-header-search {
  width: 100%;
}
.searchBar {
  /* height: 60px; */
  display: flex;
  width: 75%;
  margin: 0 auto;
  margin-top: -7px;
  border-radius: 9999px;
  background-color: rgb(235, 238, 240);
}
i {
  margin: auto;
  font-size: 14px;
}
.searchBar input {
  height: 40px;
  width: 90%;
  font-size: 15px;
  background-color: transparent;
  border: none;
}
.searchType {
  display: flex;
  margin: 0;
  height: 40px;
  margin-top: 5px;
  /* border-bottom: 1px solid rgb(212, 227, 212); */
}
.searchType a {
  margin: auto;
  display: block;
  height: 80%;
  width: 50%;
  text-align: center;
  padding-top: 10px;
}
.searchType a:hover {
  background-color: rgba(194, 235, 194, 0.504);
}
</style>