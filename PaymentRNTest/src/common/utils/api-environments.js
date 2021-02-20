/**
 * API ENVIRONMENTS
 */
import axios from "axios";
/**
 * UAT
 */

axios
  .get("http://192.168.0.104:3000")
  .then((res) => {})
  .catch((error) => {
    // console.log('debug > axios > ', error.message);
    if (error.message && error.message !== "Network Error") {
    }
  });

/**
 * DEV
 */
const dev = "https://SomeWebsiteee.com";

/**
 * TEST
 */
const test = "https://SomeWebsiteee.com";

const local = "http://192.168.0.104:3000";

const google_api = "https://maps.googleapis.com/maps/api/geocode/json";

export const api_environments = {
  dev,
  test,
  local,
  google_api
};