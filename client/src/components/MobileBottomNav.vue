<template>
  <div class="main-nav-div">
    <div>
      <router-link to="/home">
        <i class="far fa-home-lg-alt"></i>
      </router-link>
    </div>
    <div>
      <router-link to="/search">
        <i class="fal fa-search"></i>
      </router-link>
    </div>
    <div>
      <router-link to="/notifications"
        ><i class="fal fa-bell"></i>
      </router-link>
    </div>
    <div>
      <router-link to="/weather">
        <i class="fal fa-cloud"></i>
      </router-link>
    </div>
  </div>
</template>

<style>
.main-nav-div {
  display: flex;
  background: white;
  position: sticky;
  position: -webkit-sticky;
  bottom: 0;
  height: 56px;
  box-shadow: 1px 0 20px -5px gray;
}
.main-nav-div div {
  margin: auto;
  font-weight: 700;
  color: rgb(91, 112, 131);
  font-size: 19px;
  /* display: block; */
}
</style>