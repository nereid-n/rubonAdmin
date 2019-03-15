import Vue from 'vue'
import Router from 'vue-router'
import AdvertisementAdd from "./views/AdvertisementAdd";
import Advertisement from "./views/Advertisement";

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/ad/add'
    },
    {
      path: '/ad/add',
      name: 'ad-add',
      component: AdvertisementAdd,
    },
    {
      path: '/ad/update/:id',
      name: 'ad-update',
      component: AdvertisementAdd,
      meta: {action: 'UPDATE'}
    },
    {
      path: '/ad/:id',
      name: 'ad',
      component: Advertisement
    }
  ]
})
