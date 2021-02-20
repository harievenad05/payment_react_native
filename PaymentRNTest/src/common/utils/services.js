/**
 * To create object of apisouce
 */
import { create } from "axios";

/**
 * Constants
 */
import { SOMETHING_WENT_WRONG, HTTP_METHODS } from "./api-constants";

/**
 * Third-Party imports
 */

import AsyncStorage from "@react-native-community/async-storage";

/**
 * axios object
 */
const API = create({
  timeout: 60000,
});

/**
 * To set header in api when required.
 * If token found then only it will set Authorization else it will be blank.
 */
export const setHeadersInAPI = (token) => {
  let isTokenFound = false;

  token === undefined || token === ""
    ? (isTokenFound = false)
    : (isTokenFound = true);
};

const getReqJsonHeaders = async () => {
  // cookieID = await AsyncStorage.getItem("cookieID");
  return {
    'Content-Type': 'application/json'
  };
};

const getReqTextHeaders = async () => {
  return {
    'Content-Type': 'text/plain'
  };
}


/**
 * To perform api from class where this function/method is imported,
 * and send back completion in resolve or reject based on api response.
 */
export const request = (
  url,
  httpMethod,
  params,
  isPlain,
  header = {},
  isWithToken,
  token
) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(
        "token--------- httpMethod params, isPlain,  header , header , isWithToken, token",
        url,
        httpMethod,
        params,
        isPlain,
        header,
        isWithToken,
        token
      );
      // this is for user token once we enable redux we can get it from there. It is necessary to use this to call APIs.
      const tokenObj = isWithToken
        ? {
            Authorization: `Bearer ${token}` /*the token is a variable which holds the token */,
          }
        : {};

      // const tokenObj={};
      const commonJSONHeaders = await getReqJsonHeaders();
      const commonTextHeaders = await getReqTextHeaders();
      let configObj;

      if(isPlain){
        configObj = {
          headers: {
            ...header,
            ...commonTextHeaders,
          },
        };
      } else {
        configObj = {
          headers: {
            ...header,
            ...tokenObj,
            ...commonJSONHeaders
          },
        };
      }


      console.log("<><><><><> start request <><><><><>");
      console.log("<><><><><> url <><><><><>", url);
      console.log("<><><><><> httpMethod <><><><><>", httpMethod);
      console.log("<><><><><> params <><><><><>", JSON.stringify(params));
      console.log("<><><><><> isPlain <><><><><>", isPlain);
      console.log("<><><><><> headers <><><><><>", configObj.headers);
      console.log("<><><><><> end request <><><><><>");

      switch (httpMethod) {
        // GET
        case HTTP_METHODS.GET:
          doGet(url, resolve, reject, configObj);
          break;

        // POST
        case HTTP_METHODS.POST:
          doPost(url, params, resolve, reject, configObj);
          break;

        // PUT
        case HTTP_METHODS.PUT:
          doPut(url, params, resolve, reject, configObj);
          break;

        // DELETE
        case HTTP_METHODS.DELETE:
          doDelete(url, params, resolve, reject, configObj);
          break;
      }
    } catch (error) {
      reject(error);
    }
  });

/**
 *  This function is used to parse response and send completion to handle resolve and reject value for parent Promise.
 * We can consider it as a child promise
 * @param {*} response
 */
export const parseResponse = (response) =>
  new Promise((parsedResponse) => {
    const isSuccess = response.status === 200 || response.status === 201 ? true : false;
    if (isSuccess) {
      parsedResponse({ isSuccess: true, response: response });
    } else {
      let message = SOMETHING_WENT_WRONG;
      if (response.data != null && response.data.message) {
        message = response.data.message;
      }
      parsedResponse({ isSuccess: false, message: message });
    }
  });

/***
 * This function is used for service request with GET as request type
 * and send back completion in resolve or reject based on parent Promise.
 * @param {*} url
 * @param {*} resolve
 * @param {*} reject
 * @param {*} config
 */
const doGet = (url, resolve, reject, config = {}) => {
  API.get(url, config)
    .then((response) => {
      parseResponse(response).then((parsedResponse) => {
        if (parsedResponse.isSuccess) {
          resolve({ response: parsedResponse.response });
        } else {
          reject(parsedResponse.message);
        }
      });
    })
    .catch((error) => {
      console.log("ERROR GET --> ", error);
      reject(error);
    });
};

/***
 * This function is used for service request with POST as request type
 * and send back completion in resolve or reject based on parent Promise.
 * @param {*} url
 * @param {*} resolve
 * @param {*} reject
 * @param {*} config
 */
const doPost = (url, params, resolve, reject, config = {}) => {
  API.post(url, params, config)
    .then((response) => {
      parseResponse(response).then((parsedResponse) => {
        if (parsedResponse.isSuccess) {
          resolve({ response: parsedResponse.response });
        } else {
          reject(parsedResponse.message);
        }
      });
    })
    .catch((error) => {
      reject(error);
    });
};

/***
 * This function is used for service request with PUT as request type
 * and send back completion in resolve or reject based on parent Promise.
 * @param {*} url
 * @param {*} resolve
 * @param {*} reject
 * @param {*} config
 */
const doPut = (url, params, resolve, reject, config = {}) => {
  API.put(url, params, config)
    .then((response) => {
      parseResponse(response).then((parsedResponse) => {
        if (parsedResponse.isSuccess) {
          resolve({ response: parsedResponse.response });
        } else {
          reject(parsedResponse.message);
        }
      });
    })
    .catch((error) => {
      //resolve({ response:true });
      reject(error.response);
    });
};

/***
 * This function is used for service request with DELETE as request type
 * and send back completion in resolve or reject based on parent Promise.
 * @param {*} url
 * @param {*} resolve
 * @param {*} reject
 * @param {*} config
 */
const doDelete = (url, params, resolve, reject, config = {}) => {
  API.delete(url, config)
    .then((response) => {
      parseResponse(response).then((parsedResponse) => {
        if (parsedResponse.isSuccess) {
          resolve({ response: parsedResponse.response });
        } else {
          reject(parsedResponse);
        }
      });
    })
    .catch((error) => {
      reject(error.response);
    });
};
