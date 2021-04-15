<template>
  <!-- <router-link to="/profile">Profile</router-link> -->

  <div class="main-container">
    <div class="init-div">
      <div class="top-column">
        <div class="detail"><h1>R</h1></div>
      </div>
      <SideBar />
    </div>
    <main>
      <router-view> </router-view>
      <mobile-bottom-nav class="footer-mobile"></mobile-bottom-nav>
    </main>
    <div class="final-div">
      <div class="top-column">
        <search-bar> </search-bar>
      </div>
      <div class="final-div-list">
        <follow-sugg> </follow-sugg>
      </div>
    </div>
  </div>
</template>

<script>
import { myProfile } from "./PostService";
import FollowSugg from "./components/FollowSugg";
// import HeaderComponent from "./components/HeaderComponent.vue";
import SideBar from "./components/SideBarComponent";
import SearchBar from "./components/SearchBar.vue";
import MobileBottomNav from "./components/MobileBottomNav";
export default {
  name: "App",
  components: {
    SideBar,
    SearchBar,
    MobileBottomNav,
    FollowSugg,
  },
  data() {
    return {
      myProfileData: "",
    };
  },
  async created() {
    try {
      const profile = await myProfile();
      this.myProfileData = profile;
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  /* color: #2c3e50; */
  color: rgb(15, 20, 25);
  margin-top: 0px;
  /* min-height: 100vh; */
}

ul {
  list-style: none;
}

header {
  height: 50px;
  background-color: green;
  width: 100%;
}
.top-column {
  background-color: white;
  height: 50px;
  position: sticky;
  top: 0;
  border-bottom: 1px solid rgb(212, 227, 212);
  z-index: 2;
}
.final-div-list {
  display: flex;
  flex-direction: column;
}
.final-div-list a {
  margin: 20px;
  font-size: 19px;
  font-weight: 700;
}
.back-btn {
  color: green;
  cursor: pointer;
  border: none;
  background-color: white;
  margin: 0 15px;
  margin-left: 5px;
  border-radius: 50%;
  height: 30px;
  font-size: 19px;
  width: 30px;
  /* margin-top:7px; */
}
.back-btn:hover {
  background-color: rgba(0, 128, 0, 0.158);
}

a {
  color: inherit;
  text-decoration: none;
}

.main-container {
  display: flex;
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
}
.init-div {
  width: 25%;
  height: 100vh;
  text-align: center;
  position: sticky;
  top: 0;
}
.back-button {
  background-color: rgba(194, 235, 194, 0.404);
  color: green;
  cursor: pointer;
  font-size: 17px;
  padding: 10px 14px;
}
main {
  width: 42%;
  text-align: left;
  border-left: 1px solid rgb(212, 227, 212);
  border-right: 1px solid rgb(212, 227, 212);
  min-height: 100vh;
}
.footer-mobile {
  display: none;
}
.final-div {
  width: 33%;
  height: 100vh;
  /* box-shadow: 2px 2px 10px 0 gray; */
  float: right;
  position: sticky;
  top: 0;
}
.underline-on-hover:hover {
  text-decoration: underline #777777;
}
.post-type-active {
  color: rgb(75, 190, 75);
  border-bottom: 2px solid rgb(75, 190, 75);
}
.top-header {
  display: flex;
}
.top-header button {
  margin-top: -2px;
}
@media only screen and (max-width: 600px) {
  main {
    width: 100%;
    padding-bottom: 60px;
    min-height: 100vh;
  }
  .init-div {
    display: none;
  }
  .final-div {
    display: none;
  }
  .footer-mobile {
    display: flex;

    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1030;
  }
}
</style>
