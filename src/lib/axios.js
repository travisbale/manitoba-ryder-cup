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

// Set an interceptor to handle generic errors
instance.interceptors.response.use(null, async (error) => {
  // Check if the access token has expired
  if (error.response && error.response.data.msg === 'The access token has expired.') {
    // Attempt to retrieve a new access token
    await instance.post('refresh', null, { xsrfCookieName: 'csrf_refresh_token' });

    // Resend the request
    return instance.request(error.config);
  }

  // Check for server errors
  if (error.response && error.response.status === 500) {
    // TODO: Do something elegant here
  }

  // Reject the error so it can be processed further
  return Promise.reject(error);
});

export default instance;
