// const geocode = require("./geocode")
const axios = require("axios")
const forecast = async (latitude, longitude) => {
  try {
    const url = "http://api.weatherstack.com/current?access_key=03068916469ea5d73341b1d49cedbbd9&query=" + latitude + "," + longitude + "& units = m "

    const res = await axios.get(url)
    const data = await res.data

    const ForeCastMessage =
      data.current.weather_descriptions[0] +
      ". It is currently " +
      data.current.temperature +
      " degress out. It feels like " +
      data.current.feelslike +
      " degress out. And Humidity is " +
      data.current.humidity +
      "%."
    return {ForeCastMessage}
  } catch (e) {
    return {error: "Error occured"}
  }
}

module.exports = forecast
