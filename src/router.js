import Vue from 'vue'
import Router from 'vue-router'
import AdAdd from "./views/AdAdd";

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
      component: AdAdd,
    },
    {
      path: '/ad/update/:id',
      name: 'ad-update',
      component: AdAdd,
      meta: {action: 'UPDATE'}
    }
  ]
})
