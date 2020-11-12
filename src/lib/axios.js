/**
 * @file A wrapper for axios used to set defaults and interceptors required for
 * the application.
 */

import axios from 'axios';

const instance = axios.create({
  // This URL will be prepended to the 'url' property unless 'url' is absolute
  baseURL: process.env.VUE_APP_API_URL,
  // Include cookies in cross-site Access-Control requests
  withCredentials: true,
  // The name of the cookie sent as a CSRF token
  xsrfCookieName: 'csrf_access_token',
  // The name of the HTTP header that carries the CSRF token
  xsrfHeaderName: 'X-CSRF-TOKEN',
});

// Set an interceptor to retrieve a new access token if it has expired
instance.interceptors.response.use(null, async (error) => {
  if (error.response && error.response.data.msg === 'Token has expired') {
    // Attempt to retrieve a new access token
    await instance.post('refresh', null, { xsrfCookieName: 'csrf_refresh_token' });

    // Resend the request
    return instance.request(error.config);
  }

  // Refresh token has expired, user will need to re-enter their credentials
  return Promise.reject(error);
});

export default instance;
