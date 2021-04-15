<template>
  <top-column>
    <h3>Login</h3>
  </top-column>

  <div class="login-container">
    <p v-if="!formIsValid" style="color: red; margin-left: 20px">
      Invalid credentials
    </p>
    <ul>
      <li>
        <div class="full-box">
          <div class="box-name">
            <label for="username">Username</label>
          </div>
          <div>
            <input type="text" v-model="username" id="username" />
          </div>
        </div>
      </li>
      <li>
        <div class="full-box">
          <div class="box-name">
            <label for="password">Password</label>
          </div>
          <div>
            <input type="password" v-model="password" id="password" />
          </div>
        </div>
      </li>
      <li>
        <button class="login-btn" @click="submitForm">Login</button>
      </li>
      <li style="margin-top: 10px">
        <router-link to="/signup" style="text-decoration: underline">
          Signup?
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { login } from "../PostService";
export default {
  data() {
    return {
      username: "",
      password: "",
      formIsValid: true,
    };
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      try {
        if (
          this.username === "" ||
          this.password === "" ||
          this.password.length < 7 ||
          this.username.length < 5
        ) {
          this.formIsValid = false;
          return;
        }
        const validLogin = await login(this.username, this.password);
        console.log(validLogin);
        if (validLogin) {
          this.$router.push("/home");
        } else {
          this.formIsValid = false;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>


<style scoped>
.login-container {
  box-shadow: 1px 1px 12px -5px rgb(48, 47, 47);
  width: 85%;
  margin: 0 auto;
  margin-top: 50px;
  padding: 20px 0;
  border-radius: 10px;
}
.login-container ul {
  padding: 0 20px;
}
.full-box {
  background-color: white;
  margin: 10px 0;
  border: 1px solid rgb(184, 182, 182);
  padding: 3px;
  border-radius: 5px;
}
.box-name {
  color: green;
  padding: 3px 0;
  font-size: 16px;
}
input {
  width: 98%;
  height: 30px;
  resize: none;
  border: none;
  outline: none;
  font-size: 17px;
  background-color: white;
}
.login-btn {
  padding: 10px 15px;
  background: rgb(75, 190, 75);
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}
</style>