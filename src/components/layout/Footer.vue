<template>
  <v-footer color="blue" app class="px-3">
    <span class="white--text">&copy; 2017</span>
  </v-footer>
</template>

<script>
  export default {
    name: "Footer"
  }
</script>

<style scoped>
  .v-footer--absolute, .v-footer--fixed {
    z-index: 6;
  }
</style>