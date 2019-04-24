<template>
  <div>
    <Navigation :drawer="drawer"/>
    <Toolbar @toggleDrawer="toggleDrawer"/>
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
    components: {Toolbar, Navigation, Footer},
    data() {
      return {
        drawer: true,
        getUserFlag: false
      }
    },
    methods: {
      toggleDrawer(drawer) {
        this.drawer = drawer;
      }
    },
    async beforeCreate() {
      await store.dispatch('user/USER_ME')
        .then(
          (res) => {
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

</style>