<template>
  <v-app>
    <component :is="layout">
      <router-view/>
    </component>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  computed: {
    layout() {
      return (this.$route.meta.layout || 'main') + '-layout'
    }
  },
  metaInfo() {
    return {
      title: this.$route.meta.title
    }
  },
}
</script>

<style lang="scss">
  img {
    max-width: 100%;
  }
  .pos-relative {
    position: relative;
  }
</style>
