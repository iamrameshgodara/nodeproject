<template>
  <button @click="$router.go(-1)" class="close-image-btn">X</button>
  <button class="prev-img" @click="prevPhoto" v-if="photoNumber > 0">
    Prev
  </button>

  <div class="image_folder">
    <img :src="'/postImg/' + postImg[photoNumber]" />
  </div>

  <button
    class="next-img"
    @click="nextPhoto"
    v-if="photoNumber < postImg.length - 1"
  >
    Next
  </button>
</template>


<script>
import { getSinglePost } from "../PostService";
export default {
  props: [],
  data() {
    return {
      postImg: [],
      photoNumber: "",
      postId: "",
      userName: "",
    };
  },
  watch: {
    $route(NewRoute) {
      this.loadProfile(NewRoute);
    },
  },
  async created() {
    try {
      await this.loadProfile(this.$route);
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    async loadProfile(route) {
      try {
        this.postId = route.params.postId;
        this.photoNumber = route.params.photoNumber;
        this.userName = route.params.username;
        const postData = await getSinglePost(this.postId);
        this.postImg = postData.post_img;
        if (
          this.photoNumber < 0 ||
          this.photoNumber > this.postImg.length - 1
        ) {
          this.$router.push("/" + this.userName + "/status/" + this.postId);
        }
      } catch (e) {
        console.log(e);
      }
    },
    prevPhoto() {
      this.photoNumber--;
      this.$router.push(
        "/" +
          this.userName +
          "/status/" +
          this.postId +
          "/photo/" +
          this.photoNumber
      );
    },
    nextPhoto() {
      this.photoNumber++;
      this.$router.push(
        "/" +
          this.userName +
          "/status/" +
          this.postId +
          "/photo/" +
          this.photoNumber
      );
    },
  },
};
</script>

<style scoped>
.image_folder {
  width: 90vw;
  /* margin: 0 auto; */
  position: absolute;
  /* top: 8px; */
  left: 5vw;
  z-index: 1;
  height: 95vh;
  background: rgba(128, 128, 128, 0.31);
}
.image_folder img {
  display: block;

  max-height: 100%;
  max-width: 100%;
  /* margin-left: 270px; */
  margin: auto;
  object-fit: contain;
}
.close-image-btn {
  position: absolute;
  left: 15px;
  background: rgba(129, 129, 129, 0.899);
  padding: 10px 12px;
  top: 15px;
  z-index: 1;
  cursor: pointer;
  border: none;
  font-size: 15px;
  margin: auto;
  border-radius: 50%;
}
.close-image-btn:hover {
  background: rgba(129, 129, 129, 0.7);
}
.prev-img,
.next-img {
  position: absolute;
  top: 35vh;
  border: none;
  background: #666;
  padding: 10px;
  border-radius: 50%;
  z-index: 1;
  cursor: pointer;
}
.prev-img {
  left: 25px;
}
.next-img {
  right: 25px;
  float: right;
}
</style>