import Vue from 'vue'
import Router from 'vue-router'
import AdvertisementAdd from "./views/advertisement/AdvertisementAdd";
import Advertisement from "./views/advertisement/Advertisement";
import AdvertimentList from "./views/advertisement/AdvertimentList";
import Profile from "./views/settings/Profile";
import Account from "./views/settings/Account";
import Networks from "./views/settings/Networks";

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/ads'
    },
    {
      path: '/ad/add',
      name: 'ad-add',
      component: AdvertisementAdd,
      meta: {title: 'Добавление объявления'}
    },
    {
      path: '/ad/update/:id',
      name: 'ad-update',
      component: AdvertisementAdd,
      meta: {action: 'UPDATE', title: 'Редактирование объявления ', id: true},
    },
    {
      path: '/ads',
      name: 'ads',
      component: AdvertimentList,
      meta: {title: 'Список объявлений'}
    },
    {
      path: '/ad/:id',
      name: 'ad',
      component: Advertisement,
      meta: {title: 'Просмотри объявления ', id: true}
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {title: 'Профиль'}
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
      meta: {title: 'Аккаунт'}
    },
    {
      path: '/networks',
      name: 'networks',
      component: Networks,
      meta: {title: 'Соцсети'}
    }
  ]
})
