import { Settings } from 'luxon';
import Vue from 'vue';

import Toaster from '@/plugins/toaster';

import App from './App';
import router from './router';
import store from './store';

import './assets/tailwind.css';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(Toaster);

Settings.defaultLocale = 'en';

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
