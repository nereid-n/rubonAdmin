<template>
  <div>
    <Navigation :drawer="drawer"/>
    <Toolbar @toggleDrawer="toggleDrawer"/>
    <v-content>
      <v-container grid-list-xl>
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
  export default {
    name: "MainLayout",
    components: {Toolbar, Navigation, Footer},
    data() {
      return {
        drawer: true
      }
    },
    methods: {
      toggleDrawer(drawer) {
        this.drawer = drawer;
      }
    },
    created() {
      if (window.innerWidth < 920) {
        this.drawer = false;
      }
    }
  }
</script>

<style scoped>

</style>