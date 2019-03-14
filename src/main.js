import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store';
import './registerServiceWorker'
import VeeValidate from 'vee-validate';
import dictionaryRu from '../src/i18n/veeValidate/ru/dictionary.js';
import VueResource from "vue-resource"
import Vuebar from 'vuebar';
import MainLayout from './views/layouts/MainLayout';

Vue.use(Vuebar);
Vue.component('main-layout', MainLayout);

Vue.config.productionTip = false;

Vue.use(VueResource);

Vue.use(VeeValidate, {
  events: 'change|blur|input',
  locale: 'ru',
  dictionary: {
    ru: dictionaryRu
  },
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
