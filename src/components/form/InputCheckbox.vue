<template>
  <div>
    <v-checkbox :label="data.label"/>
  </div>
</template>

<script>
  import inputMixin from '../../mixins/inputMixin';

  export default {
    name: "InputCheckbox",
    mixins: [inputMixin]
  }
</script>

<style scoped>

</style>