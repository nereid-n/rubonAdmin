<template>
  <div class="pos-relative">
    <v-alert :value="showHint && error === undefined && hint !== '' && hint !== undefined"
             color="success"
             v-html="hint"
             transition="slide-x-reverse-transition"
    >
    </v-alert>
    <v-alert :value="error !== undefined"
             color="error"
             transition="slide-x-reverse-transition"
    >
      {{error}}
    </v-alert>
  </div>
</template>

<script>
  export default {
    name: "FormAlert",
    props: {
      showHint: {
        type: Boolean
      },
      error: {
        type: String
      },
      hint: {
        type: String
      },
    },
  }
</script>

<style lang="scss" scoped>
  .v-alert {
    position: absolute;
    z-index: 2;
    flex-wrap: wrap;
    @media (max-width: 960px) {
      position: static;
    }
    &.success {
      z-index: 3;
    }
  }
</style>