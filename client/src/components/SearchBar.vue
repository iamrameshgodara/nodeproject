<template>
  <top-column>
    <form @submit.prevent="submitSearchForm" class="searchBar">
      <i class="fal fa-search"></i>
      <input type="text" v-model="searchText" placeholder="Search..." /></form
  ></top-column>
</template>


<script>
export default {
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    async submitSearchForm() {
      if (this.searchText) this.$router.push("/search?q=" + this.searchText);
      this.searchText = "";
    },
  },
};
</script>

<style scoped>
.searchBar {
  /* height: 60px; */
  display: flex;
  width: 75%;
  margin: 0px auto;
  /* top: 5px; */
  /* position: relative; */
  margin-top: -10px;
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
</style>

