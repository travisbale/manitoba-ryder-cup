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
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

instance.interceptors.request.use((config) => {
  const isRefreshRequest = config.url?.includes('refresh');
  const csrfToken = getCookie(isRefreshRequest ? 'csrf_refresh_token' : 'csrf_access_token');

  if (csrfToken) {
    config.headers['X-CSRF-TOKEN'] = csrfToken;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Set an interceptor to handle generic errors
instance.interceptors.response.use(null, async (error) => {
  // Check if the access token has expired
  if (error.response && error.response.data.message === 'The access token has expired.') {
    try {
      // Attempt to retrieve a new access token
      await instance.post('refresh', null, { xsrfCookieName: 'csrf_refresh_token' });

      // Resend the request
      return instance.request(error.config);
    } catch {
      // Do nothing
    }
  }

  // Check for server errors
  if (error.response && error.response.status === 500) {
    // TODO: Do something elegant here
  }

  // Reject the error so it can be processed further
  return Promise.reject(error);
});

export default instance;
