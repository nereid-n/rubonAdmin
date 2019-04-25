<template>
  <div>
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
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
        drawer: true,
        getUserFlag: false,
        items: [
          {
            name: 'Объявления',
            to: '/cabinet/ads'
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
            console.log(res);
            if(res.body.status === 401) {
              window.location.href = '/';
            } else {
              this.$store.commit('user/userMe', {
                username: res.body.username,
                email: res.body.email,
                id: res.body.id,
                name: res.body.profile.name,
                public_email: res.body.profile.public_email,
                website: res.body.profile.website,
                avatar: res.body.profile.avatar,
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
</style>