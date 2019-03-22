<template>
  <div v-else class="loader">
    <v-progress-circular
        indeterminate
        color="primary"
    ></v-progress-circular>
  </div>
</template>

<script>
  export default {
    name: "Loader"
  }
</script>

<style scoped>
  .loader {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: calc(100vh - 148px);
  }
</style>