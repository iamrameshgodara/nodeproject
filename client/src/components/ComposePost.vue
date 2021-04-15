<template>
  <div class="newPost-container">
    <div class="close-post">
      <button @click="CloseNewPost">X</button>
    </div>
    <div>
      <textarea
        v-model="text"
        id=""
        cols="30"
        rows="10"
        placeholder="Wanna post something ?"
        autofocus="autofocus"
      ></textarea>
      <div
        class="uploaded-images"
        v-for="(image, index) in uploadFiles"
        :key="index"
      ></div>
      <input type="file" ref="files" @change="selectFile" multiple />
    </div>
    <div class="error" if="errorMessage">
      <p style="color: red">{{ errorMessage }}</p>
    </div>
    <div class="bottom-post-div">
      <button @click="PostCreate" class="new-post-btn">Post</button>
    </div>
  </div>
</template>

<script>
import { createPost, myProfile } from "../PostService";
import _ from "lodash";
export default {
  data() {
    return {
      posts: "",
      text: "",
      files: [],
      uploadFiles: [],
      errorMessage: "",
      newPostBtnOn: false,
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
  methods: {
    selectFile() {
      const files = this.$refs.files.files;
      this.uploadFiles = [...this.uploadFiles, ...files];

      this.uploadFiles = [
        ...this.uploadFiles,
        ..._.map(files, (file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
          invalidMessage: this.validate(file),
        })),
      ];
    },
    validate(file) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "video/mp4",
      ];

      if (!allowedTypes.includes(file.type)) {
        this.errorMessage = "Not an image or video";
      } else if (this.uploadFiles.length > 1 && file.type == "video/mp4") {
        this.errorMessage = "Only 1 video or 2 images are allowed";
      } else if (this.uploadFiles.length > 2) {
        this.errorMessage = "Max 2 files allowed";
      }
    },

    async PostCreate() {
      const formdata = new FormData();
      if (this.uploadFiles.length > 0 || this.text != "") {
        _.forEach(this.uploadFiles, (file) => {
          formdata.append("postImages", file);
        });

        formdata.append("postDescription", this.text);
      } else {
        this.errorMessage = "Write some post...";
      }
      try {
        if (!this.errorMessage) {
          await createPost(formdata);
          this.text = "";
          this.newPostBtnOn = false;
          this.$router.go(-1);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async CloseNewPost() {
      this.newPostBtnOn = false;
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.newPost-container {
  /* left: 120%; */
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;
  z-index: 1;
  box-shadow: 1px 1px 12px -5px rgb(48, 47, 47);
  width: 550px;
  margin: 0 auto;
  margin-top: 55px;
  border-radius: 10px;
}

.new-post {
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
  font-size: 17px;
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