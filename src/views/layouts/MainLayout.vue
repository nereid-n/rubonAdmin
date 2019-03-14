<template>
  <div>
    <Navigation/>
    <Toolbar/>
    <v-content>
      <slot/>
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
  }
</script>

<style scoped>

</style>