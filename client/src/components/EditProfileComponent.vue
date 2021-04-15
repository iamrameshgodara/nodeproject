<template>
  <top-column> </top-column>
  <div class="edit-container">
    <div style="display: flex; padding-top: 12px" class="edit-header">
      <button @click="$router.push('/' + username)" class="edit-close-btn">
        X
      </button>
      <h3>Edit profile</h3>
      <button @click="formSubmit" class="submit-btn-edit">Save</button>
    </div>
    <p v-if="!isFormValid" style="color: red">
      {{ errorMessage }}
    </p>
    <ul>
      <li>
        <img
          class="profile-pic-edit"
          :src="'/avatar/' + profilePic"
          alt="profile pic"
          style="filter: brightness(70%)"
        />
      </li>
      <li>
        <input
          style="display: none"
          type="file"
          ref="file"
          @change="selectFile"
        />

        <button
          @click="$refs.file.click()"
          style="position: relative; top: -107px; left: 65px"
        >
          <i class="fas fa-camera"></i>
        </button>
      </li>
      <li>
        <div class="full-box">
          <div class="box-name">Name</div>
          <div>
            <textarea v-model="name" cols="30" rows="3"></textarea>
          </div>
        </div>
      </li>
      <li>
        <div class="full-box">
          <div class="box-name">Bio</div>
          <div>
            <textarea v-model="bio" cols="30" rows="3"></textarea>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
import { getProfile, updateProfile, myProfile } from "../PostService";
export default {
  name: "EditProfileComponent",
  data() {
    return {
      profileData: "",
      name: "",
      file: "",
      bio: "",
      profilePic: "",
      amIOwner: false,
      username: "",
      isFormValid: true,
    };
  },
  async created() {
    try {
      const username = this.$route.params.username;
      const myProfileData = await myProfile();
      if (myProfileData.username == username) {
        this.amIOwner = true;
      } else {
        this.amIOwner = false;
        this.$router.push("/" + username);
      }
      this.profileData = await getProfile(username);
      this.username = this.profileData.username;
      this.name = this.profileData.name;
      this.bio = this.profileData.bio;
      this.profilePic = this.profileData.avatar;
    } catch (e) {
      console.log("error");
    }
  },
  methods: {
    selectFile() {
      this.file = this.$refs.file.files[0];
    },
    formSubmit() {
      this.isFormValid = true;
      const allowedTypes = ["image/jpeg", "image/png"];

      if (this.file && !allowedTypes.includes(this.file.type)) {
        this.isFormValid = false;
        this.errorMessage = "Selected Profile picture is not an image";
        return;
      }
      const formdata = new FormData();
      formdata.append("file", this.file);
      formdata.append("name", this.name);
      formdata.append("bio", this.bio);
      updateProfile(formdata);
      this.$router.replace("/" + this.username);
    },
  },
};
</script> 


<style scoped>
.edit-container {
  box-shadow: 1px 1px 12px -5px rgb(48, 47, 47);
  width: 85%;
  margin: 0 auto;
  margin-top: 50px;
  padding-bottom: 40px;
  border-radius: 10px;
}
.edit-container ul {
  padding: 0 20px;
}
.edit-header {
  border-bottom: 1px solid rgba(112, 121, 112, 0.517);
  padding: 7px 10px;
  margin-bottom: 15px;
}
.full-box {
  background-color: white;
  margin: 10px 0;
  border: 1px solid rgb(184, 182, 182);
  padding: 3px;
  border-radius: 5px;
}
.box-name {
  color: #444;
  padding: 3px 0;
  font-size: 14px;
}
textarea {
  width: 98%;
  resize: none;
  border: none;
  outline: none;
  font-size: 17px;
  background-color: white;
}
.profile-pic-edit {
  height: 150px;
  width: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin: 15px 0;
}
.edit-close-btn {
  margin-right: 20px;
  font-size: 20px;
  color: rgb(56, 160, 56);
  background: none;
  height: 30px;
  width: 30px;
  margin-top: -3px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
}
.edit-close-btn:hover {
  background-color: rgba(56, 160, 56, 0.3);
}
.submit-btn-edit {
  margin-left: auto;
  order: 2;
  background: rgb(56, 160, 56);
  border-radius: 9999px;
  padding: 8px 15px;
  font-weight: 700;
  font-size: 15px;
  border: none;
  color: white;
  cursor: pointer;
}
.fa-camera {
  /* height: 20px;
  width: 20px; */
  font-size: 20px;
  cursor: pointer;
}
</style>