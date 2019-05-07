import Vue from 'vue'
import Router from 'vue-router'
import AdvertisementAdd from "./views/advertisement/AdvertisementAdd";
import Advertisement from "./views/advertisement/Advertisement";
import AdvertimentList from "./views/advertisement/AdvertimentList";
import AdvertimentsFavorites from "./views/advertisement/AdvertimentsFavorites";
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
      redirect: '/cabinet/ads'
    },
    {
      path: '/cabinet/ad/add',
      name: 'ad-add',
      component: AdvertisementAdd,
      meta: {action: 'CREATE', title: 'Добавление объявления'}
    },
    {
      path: '/cabinet/favorites',
      name: 'favorites',
      component: AdvertimentsFavorites,
      meta: {action: 'DELETE', title: 'Избранные',},
    },
    {
      path: '/cabinet/ad/update/:id',
      name: 'ad-update',
      component: AdvertisementAdd,
      meta: {action: 'UPDATE', title: 'Редактирование объявления ', id: true},
    },
    {
      path: '/cabinet/ads',
      name: 'ads',
      component: AdvertimentList,
      redirect: 'cabinet/ads/active',
      children: [
        {
          path: 'active',
          meta: {title: 'Активные объявления', status: 2},
        },
        {
          path: 'inactive',
          meta: {title: 'Неактивные объявления', status: 5},
        },
        {
          path: 'moder',
          meta: {title: 'Объявления на проверке', status: 1},
        },
        {
          path: 'deleted',
          meta: {title: 'Удалённые объявления', status: 3},
        }
      ]
    },
    {
      path: '/cabinet/ad/:id',
      name: 'ad',
      component: Advertisement,
      meta: {title: 'Просмотри объявления ', id: true}
    },
    {
      path: '/cabinet/profile',
      name: 'profile',
      component: Profile,
      meta: {title: 'Профиль'}
    },
    {
      path: '/cabinet/account',
      name: 'account',
      component: Account,
      meta: {title: 'Аккаунт'}
    },
    {
      path: '/cabinet/networks',
      name: 'networks',
      component: Networks,
      meta: {title: 'Соцсети'}
    }
  ]
})
