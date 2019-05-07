<template>
  <div>
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <div class="main-page">
          <a href="/">Главная</a>
        </div>
        <v-list-tile v-for="item in items"
                     :to="item.to"
                     :key="item.name"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{item.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="blue" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        {{$route.meta.title}}
        <template v-if="$route.meta.id">
          {{$route.params.id}}
        </template>
      </v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down ml-auto">
        <form action="/user/logout" method="post" class="ml-auto d-flex">
          <input type="hidden" name="_csrf" :value="csrf">
          <v-btn type="submit" flat>Выход</v-btn>
        </form>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container grid-list-xl v-if="getUserFlag">
        <slot/>
      </v-container>
    </v-content>
    <Footer/>
  </div>
</template>

<script>
  import Footer from "../../components/layout/Footer";
  import Navigation from "../../components/layout/Navigation";
  import Toolbar from "../../components/layout/Toolbar";
  import store from '../../store/store';

  export default {
    name: "MainLayout",
    components: {Footer},
    data() {
      return {
        csrf: '',
        drawer: true,
        getUserFlag: false,
        items: [
          {
            name: 'Объявления',
            to: '/cabinet/ads'
          },
          {
            name: 'Избранные',
            to: '/cabinet/favorites'
          },
          {
            name: 'Добавить объявление',
            to: '/cabinet/ad/add'
          },
          {
            name: 'Профиль',
            to: '/cabinet/profile'
          },
          {
            name: 'Аккаунт',
            to: '/cabinet/account'
          },
          {
            name: 'Соцсети',
            to: '/cabinet/networks'
          }
        ]
      }
    },
    async beforeCreate() {
      await store.dispatch('user/USER_ME')
        .then(
          (res) => {
            if(res.body.status === 401) {
              window.location.href = '/';
            } else {
              this.csrf = res.body.csrf;
              this.$store.commit('user/userMe', {
                username: res.body.user.username,
                email: res.body.user.email,
                id: res.body.user.id,
                name: res.body.user.profile.name,
                public_email: res.body.user.profile.public_email,
                website: res.body.user.profile.website,
                avatar: res.body.user.profile.avatar,
              });
              this.getUserFlag = true
            }
          }
        );
    },
    created() {
      if (window.innerWidth < 1265) {
        this.drawer = false;
      }
    },
  }
</script>

<style scoped>
  .v-toolbar--fixed {
    z-index: 4;
  }
  .v-navigation-drawer {
    z-index: 5;
  }
  .main-page {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: inherit;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 16px;
    font-weight: 400;
    height: 48px;
    margin: 0;
    padding: 0 16px;
    position: relative;
    text-decoration: none;
    -webkit-transition: background .3s cubic-bezier(.25,.8,.5,1);
    transition: background .3s cubic-bezier(.25,.8,.5,1);
    transition: none;
    font-weight: 500;
    height: 40px;
  }
  .main-page a {
    height: 24px;
    line-height: 24px;
    position: relative;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
    color: rgba(0,0,0,.87);
    -webkit-transition: .3s cubic-bezier(.25,.8,.5,1);
    transition: .3s cubic-bezier(.25,.8,.5,1);
    width: 100%;
    font-size: 13px;
    outline: none;
  }
  .main-page:hover {
    background: rgba(0,0,0,.04);
  }
</style>