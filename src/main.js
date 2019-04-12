import Vue from 'vue';
import App from './App.vue';
import router from './router';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCode,
  faTerminal,
  faDraftingCompass,
  faLayerGroup
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faCode, faTerminal, faDraftingCompass, faLayerGroup);
Vue.component('font-awesome-icon', FontAwesomeIcon);

import VueObserveVisibility from 'vue-observe-visibility';
Vue.use(VueObserveVisibility);

const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.VUE_APP_SPACE_ID,
  accessToken: process.env.VUE_APP_ACCESS_TOKEN
});

export const entries = (content_type, order) => {
  return client.getEntries({
    content_type,
    order
  });
};

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
