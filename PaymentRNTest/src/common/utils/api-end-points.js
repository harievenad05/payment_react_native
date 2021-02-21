import { api_environments } from "./api-environments";

/**
 *  To bind version of API for common APIs.
 */
const API_VERSION = "v1";
let envi = "local"; //'test uat';

export function getBaseURL(env) {
  envi = env || "local"; //'test uat';
  return api_environments[envi];
}

export const getEnvironment = () => envi;

// export const OAUTH_TOKEN = () => `${getBaseURL(envi)}en/oauth/token`;

export function getLoginEndpoint() {
  return getBaseURL(envi) + `/${API_VERSION}/auth/login`;
}

export function getRegisterEndpoint() {
  return getBaseURL(envi) + `/${API_VERSION}/auth/register`;
}

export function getPaymentEndpoint() {
  return getBaseURL(envi) + `/${API_VERSION}/payments`;
}

export function getPaymentSuccessEndpoint() {
  return getBaseURL(envi) + `/${API_VERSION}/payments/success`;
}

export function getTransactionDoneEndpoint(userId) {
  return getBaseURL(envi) + `/${API_VERSION}/payments/payments/${userId}`;
}