<template>
  <v-toolbar color="blue" dark fixed app>
    <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
    <v-toolbar-title>Application</v-toolbar-title>
  </v-toolbar>
</template>

<script>
  export default {
    name: "Toolbar",
    data: () => ({
      drawer: true
    }),
    methods: {
      toggleDrawer() {
        this.drawer = !this.drawer;
        this.$emit('toggleDrawer', this.drawer);
      }
    }
  }
</script>

<style scoped>
  .v-toolbar--fixed {
    z-index: 4;
  }
</style>