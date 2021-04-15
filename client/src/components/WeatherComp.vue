<template>
  <top-column>
    <div class="top-header">
      <button @click="$router.go(-1)" class="back-btn">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h3>Weather</h3>
    </div>
  </top-column>
  <div class="weather-container">
    <form @submit.prevent="formSubmit">
      <input type="text" v-model="Address" placeholder="location" />
      <button :disabled="!Address">Search</button>
    </form>

    <div class="weather-details">
      <p>{{ location }}</p>
      <p>{{ message }}</p>
    </div>
  </div>
</template>


<script>
import { getWeather } from "../weather-app/WeatherScript";
export default {
  data() {
    return {
      Address: "",
      location: "",
      message: "",
    };
  },

  methods: {
    async formSubmit() {
      try {
        if (this.Address) {
          this.message = "Loading...";
          const getWeatherData = await getWeather(this.Address);

          if (getWeatherData.error) {
            this.message = "Something went wrong..";
          } else {
            this.location = await getWeatherData.location;
            this.message = await getWeatherData.message;
          }
        } else {
          this.location = "";
          this.message = "Please provide address";
        }
      } catch (e) {
        this.message = "Something went Wrong..";
      }
    },
  },
};
</script>


<style scoped>
.top-header {
  display: flex;
  /* padding-top: 12px; */
}
.weather-container {
  text-align: center;
  margin: 10px;
  margin-top: 30px;
  width: 90%;
}
.weather-container form {
  padding: 20px;
}
.weather-container form input {
  border: 1px solid rgb(118, 118, 118);
  background-color: white;
  height: 30px;
  width: 80%;
  padding: 2px 7px;
  font-size: 14px;
  text-rendering: auto;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  font-weight: 400;
}
.weather-container form button {
  height: 37px;
  margin-left: 3px;
  padding: 5px 10px;
  background-color: #888888;
  border: 1px solid #888888;
  cursor: pointer;
  color: white;
}
.weather-details {
  margin: 10px;
}
.weather-details p {
  margin: 15px 10px;
  display: block;
}
</style>