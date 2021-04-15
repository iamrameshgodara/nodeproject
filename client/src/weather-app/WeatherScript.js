const geocode = require("./util/geocode")
const forecast = require("./util/forecast")

const getWeather = async (Address) => {
  try {
    const {latitude, longitude, location} = await geocode(Address)
    console.log("Location: " + location)
    let message = await forecast(latitude, longitude)
    if (message.error) {
      throw new Error(message.error)
    }
    const WeatherData = {
      location,
      message: message.ForeCastMessage
    }
    return WeatherData
  } catch (e) {
    return {error: e}
  }
}

module.exports = {getWeather}
