const axios = require("axios")
const geocode = async (address) => {
  try {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURIComponent(address) +
      ".json?access_token=pk.eyJ1IjoicmFtZXNoZ29kYXJhIiwiYSI6ImNrZmpmaDl5dzFocXcyeW8zNTR2MXVwcWYifQ.HBUru62q2TL1CJ5_WWdYVQ&limit=1"

    const res = await axios.get(url)
    const data = await res.data
    if (data.features.length === 0) {
      throw new Error("Unable to find location!")
    }
    const coordinates = {
      latitude: await data.features[0].center[1],
      longitude: await data.features[0].center[0],
      location: await data.features[0].place_name
    }
    return coordinates
  } catch (e) {
    return {error: "error Occured"}
  }
}

module.exports = geocode
