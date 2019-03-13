<template>
  <v-app>
    <v-content>
      <Form/>
    </v-content>
  </v-app>
</template>

<script>

import Form from "./views/Form";
export default {
  name: 'App',
  components: {
    Form

  },
  data () {
    return {
      //
    }
  }
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
