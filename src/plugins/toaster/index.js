import BaseToast from './components/BaseToast';
import { EventBus } from './event-bus';

export default {
  install(Vue) {
    Vue.prototype.$toaster = {
      defaults: {
        position: 'bottom',
      },

      send(message, variant, options) {
        EventBus.$emit('toast-message', { message, variant, options });
      },

      success(message, options = this.defaults) {
        this.send(message, 'success', options);
      },

      warning(message, options = this.defaults) {
        this.send(message, 'warning', options);
      },

      info(message, options = this.defaults) {
        this.send(message, 'info', options);
      },

      error(message, options = this.defaults) {
        this.send(message, 'error', options);
      },

      basic(message, options = this.defaults) {
        this.send(message, 'basic', options);
      },
    };

    Vue.component('BaseToast', BaseToast);
  },
};
