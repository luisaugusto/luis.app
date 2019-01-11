import Vue from 'vue';
import App from './App.vue';
import router from './router';

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
