/**
 * Querystring library functions
 */

export default {
  /**
   * Convert an object into query string parameters
   */
  encode(obj) {
    return Object.keys(obj).map((key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`;
    }).join('&');
  },
};
